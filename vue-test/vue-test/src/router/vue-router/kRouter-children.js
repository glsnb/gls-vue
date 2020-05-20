// 插件
// 俩个全局组件router-link router-view

let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options
        // this.routerMap = {}
        // this.$options.routes.forEach(route => {
        //     this.routerMap[route.path] = route
        // })

        // 需要创建响应式的current属性
        // 利用Vue提供的defineReactive做响应化
        // 这样将来current变化的时候，依赖的组件会重新render
        // Vue.util.defineReactive(this, 'current', '')

        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'matched', [])
        // match方法可以递归遍历路由表，获取匹配关系数组

        // 监听页面hash变化和加载事件
        window.addEventListener('hashchange', this.hashChange.bind(this))
        window.addEventListener('load', this.hashChange.bind(this))
    }

    hashChange() {
        
        this.current = window.location.hash.slice(1) || '/'
        // 路径发生变化需要重新匹配
        this.matched = []
        this.match()
    }

    match(routes) {
        routes = routes || this.$options.routes
        
        for (const route of routes) {
            if (route.path === '/' && this.current === '/') {
                // 首页匹配了
                this.matched.push(route)
                return
            }
            // /about.info
            if (route.path !== '/' && this.current.includes(route.path) ) {
                this.matched.push(route)
                if (route.children && route.children.length) {
                    this.match(route.children)
                }
                return
            }
        }
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
            // 标记当前router-view深度
            this.$vnode.data.routerView = true

            let depth = 0;
            let parent = this.$parent

            while(parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data
                if (vnodeData && vnodeData.routerView) {
                    // 说明当前parent是一个router-view
                    depth++
                }

                parent = parent.$parent
            }
            let comp = null
            const route = this.$router.matched[depth]
            if (route) {
                comp = route.component
            }
            // let comp = null
            // const {routerMap, current} = this.$router
            // if (routerMap[current]) {
            //     comp = routerMap[current].component
            // }
            return h(comp)
        }
    })
}

export default VueRouter;