// 登录状态和用户角色
const state = {
    token: localStorage.getItem('token'),
    roles: []
}

const mutations = {
    // 设置用户状态
    setToken (state, token) {
        state.token = token;
    },

    // 设置用户角色
    setRoles(state, roles) {
        state.roles = roles;
    }
}

const actions = {
    // 模拟登录
    login({commit}, userInfo) {
        const { username } = userInfo;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' || username === 'outsider') {
                    commit('setToken', username);
                    resolve();
                }
                else {
                    reject("用户名、密码错误");
                }
            }, 500)
        })
    },

    // 获取角色信息
    getInfo({ state, commit }) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    const roles = state.token === 'admin' ? ['admin'] : ['outsider'];
                    commit('setRoles', roles);
                    resolve({roles})
                }, 500)  
            } catch (error) {
                reject('未知错误');
            }
            
        })
    }
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}