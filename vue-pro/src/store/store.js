import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const data = {
    state: { // 状态
        count: 10
    },
    getters: { // 计算属性
        rest(state) {
            return 10 - state.count;
        }
    },
    mutations: { // 修改状态
        reduce(state) {
            state.count--;
        }
    },
    actions: { // 业务逻辑
        boomReduce(ctx) {
            if (ctx.state.count == 0) {
                alert('连长，没有炸弹了💣');
            }
            else {
                ctx.commit('reduce');
            }
        }
    }
}

export default new Vuex.Store(data)