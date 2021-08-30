/**
 * 所有配置项
 * url         --- 链接
 * method      --- 提交方式 `post , get`
 * from        --- 接口地址 `配置接口`
 * noCheck     --- 不需要校验
 * noCover     --- 不需要loading遮蔽
 * isUpFile    --- 该接口是个上传接口
 */

const URLS = {
  //授权----------------------------------------------------------
  code2session: {
    url: 'api/get_session_key',
    method: 'POST',
    from: 'php',
    noCheck: true,
    noCover: true,
  },
  todayTask: {
    // 授权获取用户信息
    url: 'api/today_task',
    method: 'POST',
    from: 'php',
  },
  upload: {
    // 授权获取用户信息
    url: 'api/upload',
    method: 'POST',
    from: 'php',
    isUpFile:true
  }
};
export default URLS;
