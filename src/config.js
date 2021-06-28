export const tabBar = [
  {
    className: 't-icon iconshouye-weixuanzhuangtai',
    className_: 't-icon iconshouye-xuanzhongzhuangtai',
    text: '首页',
    link: 'pages/index/index',
  },
  {
    className: 't-icon iconwode-weixuanzhuangtai',
    className_: 't-icon iconwode-xuanzhongzhuangtai',
    text: '我的',
    link: 'pages/user/index',
  },
];
export const tabBarLink = tabBar.map(({ link }) => link);
export const homeLink = 'pages/index/index';
export const IMGURL =
  'https://saas-mini.oss-cn-shanghai.aliyuncs.com/Loreal_bonus/min-app/img/';