
export default (tag, config) =>
  new Promise((resolve, reject) => {
    wx[tag]({
      ...config,
      success: (res) => resolve(res),
      fail: (res) => reject(res),
    });
  });
