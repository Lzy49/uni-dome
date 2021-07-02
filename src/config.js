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
export const IMGURL = ''; // 图片地址通配符
export const SHARE = {
  title: '分享标题',
  path: '/pages/index/index',
  imageUrl: '图片url',
  success(res) {
    uni.showToast({
      title: '分享成功',
    });
  },
  fail(res) {
    uni.showToast({
      title: '分享失败',
      icon: 'none',
    });
  },
};
