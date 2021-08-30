import { alert } from '../../../libs/popup';
import { getSetting, authorize } from '../setting';
/**
 * @description 上传图片
 * @param {Boolean} compress 是否进行2次压缩
 * @param {Boolean} getInfo  是否得到详情信息
 * @param {Object} config 配置
 * @returns {Promise}
 */
export const chooseImage = (compress = false, getInfo = false, config = {}) =>
  new Promise((resolve, reject) => {
    wx.chooseImage({
      ...chooseImage.CONFIG,
      ...config,
      success: async (res) => {
        let list = res.tempFilePaths;
        if (!compress) {
          // 不需要压缩直接抛出
          resolve(list);
          return;
        }
        // 压缩成功的图片用压缩成功的图，压缩失败的图使用原图
        list = await compressImages(list).then((res) =>
          res.map((item, key) =>
            item.status === 'fulfilled' ? item.value : list[key]
          )
        );

        if (!getInfo) {
          resolve(list);
          return;
        }
        // 获取图片信息
        list = getImageInfos(list).then((res) =>
          res.map((item) =>
            item.status === 'fulfilled' ? item.value : list[key]
          )
        );
        resolve(list);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
// 默认配置 https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html
chooseImage.CONFIG = {};

/**
 * @description 压缩图片
 * @param {String/Array} paths 要压缩的图片
 * @param {Number} quality 压缩程度
 * @returns {Promise}
 */
export const compressImages = (paths = '', quality = 80) => {
  if (typeof paths === 'string') {
    return compressImage(item, quality);
  }
  if (Array.isArray(paths)) {
    return Promise.allSettled(
      paths.map((item) => compressImage(item, quality))
    );
  }
  console.error('请上传正确格式的图片，Array or String');
};
/**
 * @description 压缩图片
 * @param {String/Array} paths 要压缩的图片
 * @param {Number} quality 压缩程度
 * @returns {Promise}
 */
const compressImage = (src = '', quality = 80) =>
  src !== '' &&
  new Promise((resolve, reject) => {
    wx.compressImage({
      src, // 图片路径
      quality, // 压缩质量
      success: (res) => {
        resolve(res.tempFilePath);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });

/**
 * @description 获取图片信息
 * @param {Array / String} paths 图片路径数组或图片路径
 */

export const getImageInfos = (paths) => {
  if (typeof paths === 'string') {
    return getImageInfo(paths);
  }
  if (Array.isArray(paths)) {
    return Promise.allSettled(paths.map((item) => getImageInfo(item)));
  }
  console.error('请上传正确格式的图片，Array or String');
};

/**
 * @description 获取图片信息
 * @param {String} src 图片路径
 */
const getImageInfo = (src) =>
  new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: (res) => {
        delete res.errMsg;
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });

/**
 * @description 下载图片
 * @param {String} filePath 图片路径
 * @returns {Promise}
 */
export const saveImage = async (filePath) => {
  if (!filePath) {
    console.error('请输入图片路径');
  }
  const canSave = await getSetting('scope.writePhotosAlbum');
  if (canSave) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath,
        success(res) {
          resolve(res);
        },
        fail({ errMsg }) {
          if (
            errMsg === 'saveImageToPhotosAlbum:fail file not found' ||
            errMsg ===
              'saveImageToPhotosAlbum:fail The "path" argument must be of type string. Received type object'
          )
            alert('提示', '下载失败,文件不存在');
          reject(errMsg);
        }
      });
    });
  }
  authorize('scope.writePhotosAlbum')
    .then((res) => {
      console.log(res);
      saveImage();
    })
    .catch(() => {
      alert('提示', '您未开启权限');
    });
};
