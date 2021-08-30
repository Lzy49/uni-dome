/**
 * @description 上传视频
 */
export const chooseVideo = (config = {}, compress = true) =>
  new Promise((resolve, reject) => {
    wx.chooseVideo({
      ...chooseVideo.CONFIG,
      ...config,
      success: (res) => {
        console.log(res);
        compress
          ? compressVideo(res.tempFilePath).then((r) => resolve(...res, ...r)) // 压缩好后拼接数据返回
          : resolve(res); // 不需要压缩则直接返回
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
/**
 * @description 默认配置 https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseVideo.html
 */
chooseVideo.CONFIG = {};

/**
 * @description 压缩多个视频
 * @param {Array}} src 图片路径
 * @param {Object} config 具体文档 https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.compressVideo.html
 */
export const compressVideos = (paths = '', config = {}) => {
  console.log('多喝点', paths);
  if (typeof paths === 'string') {
    return compressVideo(item, quality);
  }
  if (Array.isArray(paths)) {
    return Promise.allSettled(paths.map((item) => compressVideo(item, config)));
  }
  console.error('请上传正确格式的图片，Array or String');
};
/**
 * @description 压缩单个视频
 * @param {String} src 图片路径
 * @param {Object} config 具体文档 https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.compressVideo.html
 */
const compressVideo = (src = '', config = {}) =>
  new Promise((resolve, reject) => {
    console.log(src);
    wx.compressVideo({
      ...compressVideo.CONFIG,
      ...config,
      src, // 视频链接
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
compressVideo.CONFIG = {
  quality: 'high',
  bitrate: 600,
  fps: 60,
  resolution: [1, 1],
};
