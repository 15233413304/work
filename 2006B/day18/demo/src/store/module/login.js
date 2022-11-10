const login ={
    // 命名空间 防止和其他模块命名相同导致冲突(污染)
    namespaced: true,
    state: {
        // 登陆状态
        isLogin: false
    },
    getters: {},
    mutations: {
        // 接受三个参数 分别是state，传过来的值，根目录store的state
        userLogin(state,logined){
            state.isLogin = logined
        }
    },
    actions: {},
}

export default login