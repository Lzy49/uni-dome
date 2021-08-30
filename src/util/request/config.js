import { checkout, default as http } from './index';
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
          http('code2session', { code: r.code }).then((res) => {
            resolve({ token: res.token });
          });
        }
      }
    });
  });
};

/**
 * @description: 成功返回值统一处理
 * @param {object} api 接口调用信息
 * @param {object} res 接口返回值
 * @param {function} resolve 成功回调 (Promise) 一般传入正确数据
 * @param {function} reject 失败回调 (Promise)
 * @param {function} notoken token 失效 执行。
 * @return {Promise}
 */
export const success = (api, res, resolve, reject, notoken) => {
  /* 例 */
  // 返回值在这里处理
  res = res.data;
  // 如果数据不是JSON对象 则转换
  typeof res === 'string' && (res = JSON.parse(res));
  if (res.status === 999) {
    notoken();
    // 校验失败 重连
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
  php: 'https:www.xxx.xx/'
};
