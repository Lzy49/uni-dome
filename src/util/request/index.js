// http 请求
import URLS from './urlManage';
import {
  getBaseURL,
  CHECKAPI,
  HEADER,
  STATUS,
  checkFun,
  STATUSTEXT,
} from './config';
import deepClone from '../libs/deepClone';
import { $showLoading, $hideLoading } from '../libs/popup';
let header = deepClone(HEADER);
let hascheck = false; // 用来判断校验header是否有效
let getCheck = false; // 是否正在获取校验header
let getCheckPromise;
// 校验请求是否合法
const http = (api, options = {}) => {
  if (URLS[api]) {
    let apiInfo = deepClone(URLS[api]);
    apiInfo.data = options;
    apiInfo.from = apiInfo.url[0]; // 该接口是那个端域名来的，后面返回值不同需要处理
    apiInfo.url = getBaseURL()[apiInfo.from] + apiInfo.url[1]; // 拼接url
    if (!apiInfo.noFeeling) {
      $showLoading();
    }
    return CHECKAPI !== '' && CHECKAPI !== api && hascheck === false
      ? checkout(apiInfo)
      : adaptive(apiInfo);
  } else {
    console.error(api + '并未出现在api列表中');
  }
};
// 校验携带加密头
const checkout = (data) => {
  if (!getCheck) {
    getCheck = true;
    getCheckPromise = checkFun().then((res) => {
      // 没有取过新的验证条件，则会去取
      header = {
        ...header,
        ...res,
      };
      hascheck = true;
      getCheck = false;
    });
  }
  return Promise.race([getCheckPromise]).then(() => adaptive(data));
};
// 配置参数
const adaptive = (data) => {
  data.header = header;
  data.url += '?v=' + new Date().getTime();
  return request(data);
};
//发送请求处理请求后的返回值
const request = function(data) {
  return new Promise(function(resolve, reject) {
    data.success = (res) => {
      // 返回值在这里处理
      res = res.data;
      typeof res === 'string' && (res = JSON.parse(res))
      if (res[STATUSTEXT[data.from]] == STATUS[data.from].ISNOTOKEN) {
        // 校验失败时重连
        if (hascheck == true) {
          hascheck = false;
        }
        resolve(checkout(data));
      } else {
        if (!data.noFeeling) {
          $hideLoading();
        }
      }
      // 成功
      if (res[STATUSTEXT[data.from]] == STATUS[data.from].ISOK) {
        // 成功取到
        resolve(res.data);
      }
      // 其他错误
      reject(res);
    };
    data.fail = () => {
      console.error(`接口请求失败，请查看NetWork,接口${data.url}`);
    };
    // 说明是上传图片接口
    if (data.isUpImg) {
      uni.uploadFile({
        ...data,
        name: 'image',
        filePath: data.data.path,
        formData: {
          ...data.data,
          path: undefined,
        },
        data: undefined,
      });
    } else {
      // 说明是普通接口
      uni.request(data);
    }
  });
};
export default http;
