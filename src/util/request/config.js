import $http from './index'
import store from '../store/index'
export const CHECKAPI = 'code2session' // 获取校验头的Api (如何设置为空则表示不校验)
export const STATUSTEXT = { // 接口返回值中状态字段
  php:'status'
}
export const STATUS = { // 接口返回值状态值
  php:{
    ISOK:0,// 访问成功
    ISNOTOKEN:999, // token 失效
  }
}
export const HEADER = { // 默认header 参数
  'content-type': "application/json",
}
const BASEURL = { // 接口地址
  develop:{ // 开发版
    php:'https://xxx.cn/'  // 
  },
  trial:{ // 体验版
    php:'https://xxx.cn/' , // 
  },
  release:{ // 正式版
    php:'https://xxx.cn/' // 
  },
}
export const getBaseURL = ()=>(BASEURL['trial' || store.getters.system.envVersion]) // 接口地址

export const checkFun = ()=>{ // 凭证校验头 （ 必须返回一个 Promise）
  // http
  return new Promise(async (resolve, reject) => {
    uni.login({
      async success(r) {
        if (r.errMsg === "login:ok") {
          // 得到 code
          $http('code2session', { code: r.code }).then(res=>{
            store.commit('setUserInfo',res)
            resolve({token:res.token})
          })
        }
      }
    })
  })
}