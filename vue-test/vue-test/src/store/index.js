import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './k-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 15
  },
  getters: {
    carMoney(state) {
      return state.count * 2;
    }
  },
  mutations: { // commit同步
    addCount(state) {
      state.count++
    }
  },
  actions: {
    addCount({commit}) {
      setTimeout(function() {
        commit('addCount')
      }, 2000)
    }
  },
  modules: {
  }
})
