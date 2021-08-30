/**
 * @description: 要拷贝的内容
 * @param {string} text  拷贝呢哦容
 * @return {Promise}
 */
export default (text = '') => {
  if (typeof text === 'string') {
    return new Promise((resolve, reject) => {
      uni.setClipboardData({
        text,
        success: resolve,
        fail: reject
      });
    });
  }
  console.error('传入内容应为String');
};
