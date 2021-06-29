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
    from: 'py',
    noCheck: true,
    noCover: true,
  },
};
export default URLS;
