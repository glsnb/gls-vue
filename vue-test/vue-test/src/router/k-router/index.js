/**
 * new Router({
 *   routes: constRouters
 * })
 */

let Vue

export default class Router {

    constructor(options) {
        this.options = options;

        this.routeMap = {};

        this.matched = [];

        this.currentRoute = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init() {
        this.bindEvents(); // 事件监听

        this.createRouteMap(); // 创建路由映射
        this.initComponent(); // 声明俩个组件
    }

    bindEvents() { // 监听hash变化和页面load事件并触发当前数据变化
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener('load', this.onHashChange.bind(this));

    }

    onHashChange() { // 改变当前路径
        this.currentRoute.current = window.location.hash.slice(1) || "/";
    }

    createRouteMap(routes = this.options.routes) {
        routes.forEach(item => {
            let obj = {};
            obj[item.path] = item.component;
            this.matched.push(obj);
            this.routeMap[item.path] = item.component
           if (item.children && item.children.length) {
                this.createRouteMap(item.children);
           }
        });
        // console.log(this.matched);
    }

    initComponent() {
        Vue.component('router-view', { // 返回该hash下的组件
            render: (h) => {
                // return h(this.routeMap[this.currentRoute.current]);
                let component = {};
                this.matched.forEach(item => {
                    component = item[this.currentRoute.current]
                    // console.log(item['/hello'])
                    // console.log(item[this.currentRoute.current])

                })
                
                return h(component);
            }
        })

        Vue.component('router-link', {
            props: {
                to: {
                    type: String,
                    required: true
                }
            },
            render(h) { // h(tag,data,children)
                return h('a', {attrs: {href: this.to}}, [this.$slots.default])
            }
        })
    }
}

Router.install = function(_vue) {
    Vue = _vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init();
            }
        }
    })
}