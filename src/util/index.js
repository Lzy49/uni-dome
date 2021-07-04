/* 全局工具引入 */
import $router from './router';
import $store from './store';
import $u from './libs/popup';
import $Storage from './libs/storage';
import $http from './request';
import mixins_share from './mixins/share';
import mixins_index from './mixins/index';
// $store,
const utils = {
  $Storage,
  $router,
  $store,
  $u,
  $http,
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
  Vue.mixin(mixins_share);
  Vue.mixin(mixins_index);
};
export default {
  install,
};
