/* 全局工具引入 */
import $router from './router';
import $store from './store';
import $u from './libs/popup';
import $Storage from './libs/storage';
import $http from './request'
import share from './mixins/share'
// $store,
const utils = {
  $Storage,
  $router,
  $store,
  $u,
  $http
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
  Vue.mixin(share)
};
export default {
  install,
};
