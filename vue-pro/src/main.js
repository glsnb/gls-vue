// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router  from './router'
import {asyncRoutes}  from './router'
import VueHighlightJS from 'vue-highlightjs'

import store from './store/store'
// import store from './vuex/store'

router.addRoutes(asyncRoutes);
Vue.use(VueHighlightJS)

Vue.config.productionTip = false

class Bus {
  constructor() {
    this.callbacks = {};
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      // 存在 遍历所有callback
      this.callbacks[name].forEach(cb => cb(args));
    }
  }
}

Vue.prototype.$bus = new Bus();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
