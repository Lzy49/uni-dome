const envVersions = ['develop','trial','release']
// 跳转其他小程序
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