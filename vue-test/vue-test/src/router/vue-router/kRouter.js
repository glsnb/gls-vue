// 插件
// 俩个全局组件router-link router-view

let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options
        this.routerMap = {}
        this.$options.routes.forEach(route => {
            this.routerMap[route.path] = route
        })

        // 数据响应式
        Vue.util.defineReactive(this, 'current', '')

        // 监听页面hash变化和加载事件
        window.addEventListener('hashchange', this.hashChange.bind(this))
        window.addEventListener('load', this.hashChange.bind(this))
    }
    hashChange() {
        console.log(window.location.hash);
        this.current = window.location.hash.slice(1) || '/'
    }
}

VueRouter.install = function(_vue) {
    // 把Vue的构造函数存起来
    Vue = _vue
    // 在use()的时候，组件实例并不存在，需要晚一些执行需要用混入
    Vue.mixin({
        beforeCreate() {
            // 配置对象中有router
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 创建俩个全局组件
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h('a', {attrs: {href: '#' + this.to }}, this.$slots.default)
        }
    });

    Vue.component('router-view', {
        render(h) {
            let comp = null
            const {routerMap, current} = this.$router
            if (routerMap[current]) {
                comp = routerMap[current].component
            }
            return h(comp)
        }
    })
}

export default VueRouter;