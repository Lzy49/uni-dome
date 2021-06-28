import Vue from 'vue';
import Vuex from 'vuex';
import system from './module/system';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    system,
  },
});
store.initData = function(){
  this.commit('initSystemInfo')
}
export default store;
