import axios from "@/axios/axios"
const home ={
    // 命名空间 防止和其他模块命名相同导致冲突(污染)
    namespaced: true,
    state: {
        // 当前展示的数据
        list:[],
        // 总数据条数
        total:0,
        // 详情页
        detail:{},
    },
    getters: {},
    mutations: {
        // mutations里的函数提供两个参数 第一个参数是state 第二个参数(可选)是commit传过来的值
        setList(state,data){
            state.list = data.newList
            state.total = data.total
        },
        setDetail(s,item){
            s.detail = item
        }
    },
    actions: {
        // actions里的函数提供两个参数 第一个参数是上下文 第二个参数是传过来的值
        getList({commit},page){
            axios.get('/api/list').then(res =>{
                let newList = res.data.slice(0,page*10)
                commit('setList',{newList,total:res.data.length})
            })
        }
    },
}

export default home