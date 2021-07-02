const envVersions = ['develop','trial','release']
/**
 * @description 跳转其他小程序
 * @param {String} appid appid 
 * @param {String} path 路径
 * @param {Object} extraData 参数
 * @param {String} envVersion 跳转方式
 */

export default (appid,path,extraData = {},envVersion='release')=>{
  if(!envVersions.includes(envVersion)) console.error('请设置正确的小程序版本')
  if(typeof appid === 'string' && typeof path  === 'string' ){
    return new Promise((resolve,reject)=>{
      uni.navigateToMiniProgram({
        appId: appid,
        path: path,
        extraData,
        envVersion,
        success:resolve,
        fail:reject
      })
    })
  }
}