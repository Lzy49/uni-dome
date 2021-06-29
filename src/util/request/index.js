import urls from './urls';
import { deepClone } from '../function/deep';
import { $showLoading, $hideLoading } from '../libs/popup';
import { BASEURL , checkFun} from './config';

let header = {}; // 请求头
// 提交数据
const http = (apiName, data, path) => {
  let api = deepClone(urls[apiName]);
  api.data = data;
  // 如果有 path 则要给数据中拼上 path
  api.filePath = path;
  // 有些接口不需要显示 loading
  if (!api.noCover) $showLoading();
  // 有些接口不需要校验token
  return api.noCheck || typeof checkFun !== 'function' ? adaptive(api) : checkout(api);
};

// 请求前检查
export const checkout = function(api) {
  // 如果有 token 直接进入
  if (checkout.has) return adaptive(api);
  // 如果是 请求token 状态则等待
  if (!checkout.get) {
    checkout.get = true;
    checkout.getPromise = checkFun().then((res) => {
      // 没有取过新的验证条件，则会去取
      header = {
        ...header,
        ...res,
      };
      checkout.has = true;
      checkout.get = false;
    });
  }
  return Promise.race([checkout.getPromise]).then(() => adaptive(data));
};
checkout.has = false; // token 已请求到
checkout.get = false; // 在 请求 token 状态中
checkout.getPromise = undefined; // 请求 token 的方法

// 配置参数
const adaptive = (api) => {
  api.header = header;
  api.url = BASEURL[api.from] + api.url + '?v=' + new Date().getTime();
  return request(api);
};

//发送请求处理请求后的返回值
const request = function(api) {
  return new Promise(function(resolve, reject) {
    api.success = (res) => {
      success(api, res, resolve, reject);
      !api.noCover && $hideLoading();
    };
    api.fail = (res) => {
      reject(res);
      !api.noCover && $hideLoading();
    };
    if (api.isUpFile) {
      // 上传接口
      uni.uploadFile({
        ...api,
        name: 'image',
        formData: api.data,
      });
    } else {
      // 普通接口
      uni.request(api);
    }
  });
};
export default http;
