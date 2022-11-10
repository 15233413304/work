import axios from "@/axios/axios"
const home ={
    // 命名空间 防止和其他模块命名相同导致冲突(污染)
    namespaced: true,
    state: {
        list:[],
        pageList:[]
    },
    getters: {},
    mutations: {
        setPageList(state,payload){
            state.pageList = payload
        }
    },
    actions: {
        getPageList({commit},payload){
            axios.get('/api/list',{page:payload}).then(res=>{
                commit('setPageList',res)
            })
        }
    },
}

export default home