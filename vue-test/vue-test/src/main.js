import Vue from 'vue'
import App from './App.vue'
import router from './router/vue-router/index'
import VueHighlightJS from 'vue-highlightjs'
import 'highlightjs/styles/github.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import {create} from '@/components/notice/utils/create.js'
import Notice from '@/components/notice'

Vue.use(ElementUI)

Vue.use(VueHighlightJS)
Vue.config.productionTip = false

// 事件总线——方式一
// Vue.prototype.$bus = new Vue()

// 事件总线——方式二
class Bus {
  constructor() {
    this.mapCallback = {}
  }
  $on(name, fn) {
    this.mapCallback[name] = this.mapCallback[name] || []
    this.mapCallback[name].push(fn)
  }
  $emit(name, args) {
    this.mapCallback[name].forEach(cb => {
      cb(args)
    });
  }
}
Vue.prototype.$bus = new Bus()

Vue.prototype.$notice = (props) => {
  const comp = create(Notice, props)
  comp.show()
  return comp
}
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
