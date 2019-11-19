// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* 过滤传入图片的width，height并进行设置 */
Vue.filter('setWH',(url,arg) => {
  return url.replace(/w\.h/,arg)
})
/* eslint-disable no-new */

import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.component('Scroller', Scroller)
Vue.component('Loading', Loading)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
