// 创建vue实例的方式
// 方式1：组件配置对象 =》 Ctor = Vue.extend(Component)变成构造函数
// =》 new Ctor()
// 方式2：借鸡生蛋new Vue({render() {}}),在render中把Component作为根组件

import Vue from 'vue'

export function create(component, props) {
    const vm = new Vue({ // 根组件
        render(h) {
            return h(component, {props})
        }
    }).$mount()

    document.body.appendChild(vm.$el)

    // 根实例
    const comp = vm.$children[0]

    comp.remove = () => {
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return comp

}
