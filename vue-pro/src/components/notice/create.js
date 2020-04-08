import Vue from 'vue';

export default function create(Component, props) {
    const vm = new Vue({
        render: h => h(Component, props) // 生成虚拟dom
    }).$mount() // 不传参，只进行从虚拟dom转换成真实dom

    document.body.appendChild(vm.$el);

    const comp = vm.$children[0];
    comp.remove = () => {
        document.body.removeChild(vm.$el);
        comp.$destroy();
    }
    
    return comp;
}