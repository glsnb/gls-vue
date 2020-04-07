// 1. 插件
let Vue; // 通过插件传递进来

// 2. VueRouter类

export default class Router {

    constructor(options) {
        this.options = options;

        // 声明map，把path和component映射
        this.routeMap = {};

        // app.current 当前的hash，利用vue做成响应的
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init() {
        // 事件监听
        this.bindEvents();

        // 创建路由映射
        this.createRouteMap();

        // 声明俩个全局组件router-link,router-view
        this.initComponent();
    }

    bindEvents() {
        // 监听hash变化
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener("load", this.onHashChange.bind(this));
    }

    onHashChange() {
        // #/a/b
        this.app.current = window.location.hash.slice(1) || "/";
    }

    // 解析routes选项
    createRouteMap() {
        this.options.routes.forEach(item => {
            this.routeMap[item.path] = item.component;
            // if (item.children) {
            //     item.children.forEach(ele => {
            //         console.log(ele.path, ele.component)
            //         this.routeMap[ele.path] = ele.component;
            //     })
            // }
        });
        // console.log(this.routeMap);
    }

    initComponent() {
        Vue.component('router-link', {
            props: {
                to: {
                    type: String,
                    required: true
                }
            },

            render(h) {
                // render生成虚拟dom
                // 描述渲染dom结构
                // h(tag,data,children)
                return h('a', {attrs: {href: this.to}},[this.$slots.default]);
            }
        })

        Vue.component('router-view', {
            render: h => {
                return h(this.routeMap[this.app.current])
            }
        })
    }

}

// 混入要求实现install方法
Router.install = function(_Vue) {
    Vue = _Vue;
    
    // 混入：挂载$router
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;

                this.$options.router.init();
            }
        }
    })
}