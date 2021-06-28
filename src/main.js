import Vue from 'vue'
import App from './App'
import navigation from './components/main/navigation.vue'
import tabBar from './components/main/tabBar.vue'
import utils from './util'

Vue.use(utils);
Vue.component('navigation', navigation)
Vue.component('tabBar', tabBar)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()