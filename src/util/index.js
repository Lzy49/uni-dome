/* 全局工具引入 */
import $router from './router';
import $store from './store';
import $u from './libs/popup';
import $Storage from './libs/storage';
// $store,
const utils = {
  $Storage,
  $router,
  $store,
  $u,
};
for (const key in utils) {
  uni[key] = utils[key];
}
/* 全局 minxin 引入 */
const install = (Vue) => {
  for (const key in utils) {
    Vue.prototype[key] = utils[key];
  }
  $store.initData();
};
export default {
  install,
};
