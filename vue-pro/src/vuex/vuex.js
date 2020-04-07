let Vue;

class Store {
    constructor(options) {

        // state: {}是响应式的
        this.state = new Vue({
            data: options.state
        })

        // getters: data(state, getters) {}
        this.handleGetters(options.getters);

        // mutations: add(state){}
        this.mutations = options.mutations || {};

        // actions: add(ctx){}
        this.actions = options.actions || {};
    }

    commit = (type, args) => {
        this.mutations[type](this.state, args);
    }

    dispatch = (type, args) => {
        this.actions[type]({
            commit: this.commit,
            state: this.state,
            getters: this.getters,
            dispatch: this.dispatch
        }, args)
    }

    handleGetters(getters) {
        this.getters = {}
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state)
                }
            })
        })
    }
}

function install(_Vue) {
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }