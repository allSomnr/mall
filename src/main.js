import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store/index.js'
import Toast from "components/common/toast/index.js"
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

FastClick.attach(document.body)

Vue.use(Toast)
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
