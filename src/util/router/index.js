import pageInfo from './pageInfo';
import { homeLink } from '@/config';
let option = {}; // 所有的页面传递参数
const routerModeArr = [
  // 跳转方式
  'navigateTo',
  'redirectTo',
  'reLaunch',
  'navigateBack',
];
/**
 * @description 字符串路由参数转对象
 * @method urlToData
 * @param url {string}        链接
 * @return data.url {string}  转换后的路由
 * @return data.data {string} 转换后的数据
 */
function urlToData(url) {
  url = url.split('?');
  if (!url[1]) {
    return { url: url[0], data: {} };
  }
  let data = {};
  for (let item of url[1].split('&')) {
    const [key, value] = item.split('=');
    data[key] = value;
  }
  return { url: url[0], data };
}
/**
 * @description 绝对路径转相对路径
 * @method path
 * @param next {string} 要转换路径
 * @param now {string} 当前路径
 * @return newNext {string} 转好的路径
 */
function path(next,now){
  let reg = new RegExp("\\.\\./", "g")
  let m = next.match(reg)
  let lastIndex = now.length
  for (let i = 0; i <= m.length; i++) {
    lastIndex = now.lastIndexOf("/", lastIndex);
    now = now.substr(0, lastIndex)
  }
  return now + '/' + next.replace(reg,'')
}
/**
 * @description scene 字符串 转换为对象
 * @method scene2Data
 * @param scene {string} 商定 字符串格式（type,xx,xx,xx)
 * @retrun data {Object} 解析后的结果
 */
function scene2Data(scene) {
  scene = decodeURIComponent(scene); // 解码
  scene = scene.split(','); // 分割
  if (scene.length === 0) return {};
  switch (scene[0]) {
    // 可以扩展，以下为例
    case '1': // ( type,用户id)
      return {
        SCENEDATA: {
          uid: scene[1], // 用户id
        },
      };
    case '2':
      return {
        SCENEDATA: {
          // （type,活动id)
          id: scene[1],
        },
      };
    default:
      return {};
  }
}
/**
 * @description 路由跳转
 * @method router
 * @param mode {string}   请求方式
 * @param url {string}    请求链接
 * @param data {object}   数据
 * @param config {object} 其他配置
 * @return {Promise} 
 */
const router = function(url = '', data = {}, mode = 'navigateTo', config = {}) {
  /* 判断跳转方式是否正确 */
  if (!routerModeArr.includes(mode)) {
    console.error('请检查跳转方式');
    return false;
  }
  /* 判断是否是后退 */
  if (mode === 'navigateBack')
    return router.back(typeof url === 'number' ? url : 1, data, config);
  /* 对url做一下处理 */
  if(typeof url !== 'string'){
    console.error('请检查路由是否传入正确');
  }
  const { data: d, url: u } = urlToData(url);
  data = { ...data, ...d };
  url = u;
  /* 对 url 进行判断 */
  const { isHome, nowPage } = pageInfo(url);
  // 判断是不是相对路径 ( 因为要给绝对路径存值 )
  if(url.indexOf('pages/') !== 0){
    url = path(url,nowPage)
  }
  // 如果是当前页面则不跳转
  if (url === nowPage) return;
  // 如果是首页则跳转不带返回
  isHome && (mode = 'reLaunch');
  /* 可以跳转了 */
  // 存下参数
  option[url] = data;
  return new Promise(function(resolve, reject) {
    uni[mode]({
      url: '/' + url,
      ...config,
      success: () => {
        resolve('成功');
      },
      fail: () => {
        reject('失败');
      },
    });
  });
};
/**
 * @description 路由跳转
 * @method router.back
 * @param delta {number}  返回几页
 * @param data {object}   数据
 * @param config {object} 其他配置
 */
router.back = (delta = 1, data = {}, config) => {
  console.log('我被调用没',delta,data)
  const { urlList, length } = pageInfo();
  /* 如果无法后退 */
  if (length === 1) return;
  /* 处理参数 */
  let url = delta ? urlList[length - 1 - delta] : urlList[length - 2];
  option[url] = { ...router.getOption(url), ...data };
  /* 执行后退 */
  return new Promise(function(resolve, reject) {
    uni.navigateBack({
      delta,
      ...config,
      success: () => {
        resolve('成功');
      },
      fail: () => {
        reject('失败');
      },
    });
  });
};

/* 返回首页 */
router.goHome = (data) => router(homeLink,data);

/**
 * @description 获取当前页面参数
 * @method router.getOption
 * @param link {string}  页面路由默认当前页面
 * @retrun data {Object} 页面参数 包括 通过onLoad 传入的参数
 */
router.getOption = (link = pageInfo().page) => {
  // 通过路由方法传递的参数
  let optionData = option[link] ?? {};
  // 外部小程序传入的参数
  let pageData = pageInfo().options;
  // 对外部小程序传入参数的 scene 做解析 （因为 scene 生成二维码时，长度有限）
  pageData.scene && (pageData.scene &&= scene2Data(pageData.scene));
  return { ...optionData, ...pageData };
};
router.getPageInfo = pageInfo;
export default router;
