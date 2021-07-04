import { confirm } from '../../libs/popup';
/**
 *
 * @param {String} scope 要验证的权限
 * @returns {Promise} 如果有 scope 则会对 传入权限判断，否则返权限列表
 */
export const getSetting = (scope = '') =>
  wx
    .getSetting()
    .then((res) => (scope === '' ? res.authSetting : !!res.authSetting[scope]));

const scopes = {
  'scope.userInfo': '用户信息',
  'scope.userLocation': '地理位置',
  'scope.userLocationBackground': '后台定位',
  'scope.werun': '微信运动步数',
  'scope.record': '录音',
  'scope.writePhotosAlbum': '相册',
  'scope.camera': '摄像头',
};
/**
 * 获取某权限
 * @param {String} scope 要开启的权限
 * @param {Boolean} again 是否开启2次权限请求
 * @returns {Promise}
 */
export const authorize = (scope = '', again = true) => {
  if (!Object.keys(scopes).includes(scope)) {
    console.error('必须传入要开启的权限');
  }
  return new Promise((resolve, reject) => {
    wx.authorize({ scope })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        if (again) {
          confirm(
            '提示',
            `如想使用该功能，需要您手动开启${scopes[scope]}权限,是否去开启权限`,
            {
              confirmText: '去开启',
            }
          ).then(() => {
            resolve(openSetting(scope))
          }).catch(res=>{
            reject(false)
          })
        } else {
          reject(false);
        }
      });
  });
};
/**
 * @description 调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的权限。
 * @param {String} withSubscriptions 是否同时获取用户订阅消息的订阅状态，默认不获取。注意：withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。
 * @returns {Promise}
 */
const openSetting = (scope = '', withSubscriptions = false) => {
  if (scope !== '' && !Object.keys(scopes).includes(scope)) {
    console.error('必须传入要开启的权限');
  }
  return wx
    .openSetting({
      withSubscriptions,
    })
    .then((res) => {
      if (!withSubscriptions && scope !== '') {
        return !!res.authSetting['scope']
          ? Promise.resolve(true)
          : Promise.reject(false);
      } else {
        return res;
      }
    });
};
