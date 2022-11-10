import axios from '@/axios/axios'
const home = {
    // 命名空间 防止和其他模块冲突
    namespaced: true,
     // 存储状态（源数据）
    //  this.$store.state.home.homeList
    state: {
        // 主页列表数据
        homeData:{}
    },
    // 计算属性 类似于computed 
    //getters里的函数会默认接受一个参数 state
    getters: {
        list(state){
            return state.homeData
        }
    },
    // 存放同步操作函数
    // mutations 里的函数 有两个参数 第一个参数：state，第二个参数：传过来的值
    // 在页面上 通过this.$store.commit("home/函数名",传过去的值)
    mutations: {
        // 接收到传过来的数据 并对state里的homeList进行赋值
        setList(state,data){
            state.homeData = data
        }
    },
    // 存放异步操作函数
    // actions 里的函数 有两个参数 第一个参数： 上下文（store），第二个参数：传过来的值
    // 在页面上通过 this.$store.dispatch("home/函数名",传过去的值)
    actions: {
        getList({commit},data){
            let { page, pageSize } = data
            // 请求数据
            axios.get('/api/list',{params:{ page, pageSize }}).then(res=>{
                // 将返回数据 传给mutations里的setList函数
                commit('setList',res)
            }) 
        }
    },
}

export default home