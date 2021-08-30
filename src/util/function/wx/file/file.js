/**
 * @description 上传 图片 + 视频
 * @param {Object} config // 配置项
 */
export const chooseMedia = (config = {}) =>
  new Promise((resolve, reject) => {
    wx.chooseMedia({
      ...chooseMedia.CONFIG,
      ...config,
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
chooseMedia.CONFIG = {}; // 默认配置 https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html

/**
 * 上传 从客户端会话选择文件。
 * @param {Object} config 默认配置 https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html
 * @returns {Promise}
 */
export const chooseMessageFile = (config = {}) =>
  new Promise((resolve, reject) => {
    wx.chooseMessageFile({
      ...chooseMessageFile.CONFIG,
      ...config,
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
chooseMessageFile.CONFIG = {
  count: 10,
};
