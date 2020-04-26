import Toast from './test.vue'

function create({Vue, title, msg}) {
    const glsConstructor = Vue.extend(Toast)
    const glsToast = new glsConstructor(title, msg)
    glsToast.$mount();
    glsToast.$slots.default = [msg]
    glsToast.onShow();
    console.log(glsToast);
    
    document.body.appendChild(glsToast.$el)
    return glsToast
}
export default {
    install(Vue, options) {
        Vue.prototype.$glsToast = function(title, msg) {
            create({Vue, title, msg})
        }
    }
    
}
