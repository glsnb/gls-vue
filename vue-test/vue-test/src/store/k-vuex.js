// 目标1：实现Store类，管理state（响应式），commit，dispatch
// 目标2：插件

let Vue;

class Store {
    constructor(options) {
        

        this._mutations = options.mutations
        this._actions = options.actions
        this._wrappedGetters = options.getters

        // 定义computed选项
        const computed = {}
        this.getters = {}
        const store = this
        Object.keys(this._wrappedGetters).forEach(key => {
            // 获取用户定义的getter
            const fn = store._wrappedGetters[key]
            // 转换为computed可以使用无参数形式
            computed[key] = function() {
                return fn(store.state)
            }
            // 为getters定义只读属性
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key]
            })
        })

        // state响应式
        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        })
        
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)

    }

    // stata只读
    get state() {
        return this._vm._data.$$state
    }

    // commit方法，修改state
    commit(type, payload) {
        const entry = this._mutations[type]
        if (entry) {
            entry(this.state, payload)
        }
    }

    // actions方法
    dispatch(type, payload) {
        const entry = this._actions[type]
        if (entry) {
            entry(this, payload)
        }
    }

}

function install (_vue) {
    Vue = _vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {Store, install}