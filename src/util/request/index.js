import urls from './urls';
import { deepClone } from '../function/deep';
import { showLoading, hideLoading } from '../libs/popup';
import { BASEURL, checkFun, success } from './config';

let header = {}; // 请求头
/**
 * @description: 提交数据
 * @param {String} apiName 接口 key
 * @param {Object} data 请求数据
 * @param {String} path 上传文件的 链接
 * @return {Promise}
 */
const http = (apiName, data = {}, path = '') => {
  let api = deepClone(urls[apiName]);
  api.data = data;
  // 如果有 path 则要给数据中拼上 path
  api.filePath = path;
  // 有些接口不需要显示 loading
  api.url = BASEURL[api.from] + api.url;
  if (!api.noCover) showLoading();
  // 有些接口不需要校验token
  return api.noCheck || typeof checkFun !== 'function'
    ? adaptive(api)
    : checkout(api);
};

/**
 * @description: 请求前检查
 * @param {Object} api  拼接的请求数据
 * @return {Promise}
 */
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
        ...res
      };
      checkout.has = true;
      checkout.get = false;
    });
  }
  return Promise.race([checkout.getPromise]).then(() => adaptive(api));
};
checkout.has = false; // token 已请求到
checkout.get = false; // 在 请求 token 状态中
checkout.getPromise = undefined; // 请求 token 的方法

/**
 * @description: 配置 url 和 header
 * @param {Object} api  拼接的请求数据
 * @return {Promise}
 */
const adaptive = (api) => {
  api.header = header;
  api.url += '?v=' + new Date().getTime();
  return request(api);
};

/**
 * @description: 发送请求处理请求后的返回值
 * @param {Object} api  拼接的请求数据
 * @return {Promise}
 */
const request = function(api) {
  return new Promise(function(resolve, reject) {
    api.success = (res) => {
      // 传递给 配置的成功返回
      success(api, res, resolve, reject, () => {
        checkout.has = false;
        resolve(checkout(api));
      });
      // 隐藏 loading 窗
      !api.noCover && hideLoading();
    };
    api.fail = (res) => {
      reject(res);
      !api.noCover && hideLoading();
    };
    // 判断 是那种上传模式
    if (api.isUpFile) {
      console.log('执行了吧亲');
      // 上传接口
      uni.uploadFile({
        ...api,
        name: 'image',
        formData: api.data
      });
    } else {
      // 普通接口
      uni.request(api);
    }
  });
};
export default http;
