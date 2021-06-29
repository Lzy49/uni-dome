import {checkout} from './index'
/**
 * @description: 校验凭证 (如果不需要校验凭证则可以将函数设置为 false )
 * @return {Promise} 返回一个 Promise 成功值返回一个 对象，该对象会拼到 head 中
 */
export const checkFun = () => {
  // 例：使用微信的 code 当作 token
  return new Promise((resolve) => {
    uni.login({
      success(r) {
        if (r.errMsg === 'login:ok') {
          resolve({ token: r.code });
        }
      },
    });
  });
};

/**
 * @description: 成功返回值统一处理
 * @param api {object} 接口调用信息
 * @param res {object} 接口返回值
 * @param resolve {function} 成功回调 (Promise) 一般传入正确数据
 * @param reject  {function} 失败回调 (Promise)
 * @return {Promise}
 */
export const success = (api, res, resolve, reject) => {
  /* 例 */
  // 返回值在这里处理
  res = res.data;
  // 如果数据不是JSON对象 则转换
  typeof res === 'string' && (res = JSON.parse(res));
  if (res.status === 1000) {
    // 校验失败 重连
    checkout.has = false;
    resolve(checkout(data));
  }
  // 成功
  if (res.status === 0) {
    resolve(res.data);
  }
  // 其他错误
  reject(res);
  /* 例 end */
};
// 接口地址
export const BASEURL = {
  'php':'https:www.xxx.xx/'
}