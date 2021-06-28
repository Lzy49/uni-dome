const URLS = {
  //授权----------------------------------------------------------
  code2session: {
    // code2session
    url: ['php', 'api/get_session_key'],
    method: 'POST',
    noIntegrant: true, // 不需要验证token
    noCheck: true, // 不需要验证是否已经把登录接口里的所有接口都走完
  },
}
export default URLS