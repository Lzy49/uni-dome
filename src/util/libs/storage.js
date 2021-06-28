/* 缓存的一些操作 */
export default {
  getSync(keyName) {
    // 同步取
    let data = uni.getStorageSync(keyName);
    data = data !== undefined && data !== '' && data !== null && JSON.parse(data)
    // 如果有过期时间 需要判断是否过期
    if(data && data.time !== ''){ 
      let now = new Date().getTime();
      if (now >= data.time){
        // 如果过期直接销毁
        this.remove(keyName)
        return undefined
      }
    }
    // 抛出值
    return data.data
  },
  set(keyName, data, time = '') {
    // 异步存
    if(!keyName || !data){
      console.error('请保证传入key和传入value均存在')
    }
    return new Promise(function(resolve, reject) {
      let d = { data, time };
      uni.setStorage({
        key: keyName,
        data: JSON.stringify(d),
        success: function() {
          resolve('成功');
        },
        fail: function() {
          reject('!失败');
          console.error('存储失败，失败key为：' + keyName);
        },
      });
    });
  },
  setSync(keyName, data, time = '') {
    // 同步存
    if(!keyName || !data){
      console.error('请保证传入key和传入value均存在')
    }
    try {
      let d = { data, time };
      uni.setStorageSync(keyName, JSON.stringify(d));
    } catch (e) {
      console.error('存储失败，失败key为：' + keyName);
    }
  },
  remove(keyName) {
    uni.removeStorageSync(keyName);
  },
};
