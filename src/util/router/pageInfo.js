import { homeLink, tabBarLink } from '@/config';
let pageInfo = {};
// 该js 用于获取页面 以及路由的信息
export default (page) => {
  
  const CurrentPages = getCurrentPages();
  // 更新结果并返回结果
  let urlList = [];
  let optionsList = {};
  for (let k in CurrentPages) {
    const { route, options } = CurrentPages[k];
    optionsList[route] = options;
    urlList.push(CurrentPages[k].route);
  }
  const length = urlList.length;
  const nowPage = urlList[length - 1];
  page ??= nowPage;
  const isHome = page == homeLink;
  const isTabBar = tabBarLink.includes(page);
  return (pageInfo = {
    length,  // 当前有多少个路由
    page,    // 传入url
    nowPage, // 当前url
    isTabBar,// 传入url是不是 底部菜单
    isHome,  // 传入url是不是 首页
    urlList, // 当前所有路由url
    optionsList, // 所有路由 onLoad 传入参数
    options: optionsList[page] ?? {}, // 传入url 通过 onLoad 方法传入的参
  });
};
