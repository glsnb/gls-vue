import Vue from 'vue'

// 创建vue实例的方式
// 方式1：组件配置对象 =》 Ctor = Vue.extend(Component)变成构造函数
// =》 new Ctor()
export function create(component, props) {
    const Ctor = Vue.extend(component)
    // 创建组件实例=》虚拟dom
    const comp = new Ctor({propsData: props})
    // 虚拟dom =》转为真实dom
    comp.$mount()
    // 追加body
    document.body.appendChild(comp.$el)
    comp.remove = () => {
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }
    return comp
}

// 方式2：借鸡生蛋new Vue({render() {}}),在render中把Component作为根组件

// export function create(component, props) {
//     const vm = new Vue({
//         render(h) {
//             return h(component, {props})
//         }
//     }).$mount()

//     document.body.appendChild(vm.$el)

//     const comp = vm.$children[0]

//     comp.remove = () => {
//         document.body.removeChild(vm.$el)
//         vm.$destroy()
//     }
//     return comp
// }
