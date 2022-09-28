import axios from '@/request/request'
let home = {
    namespaced: true,
    state:{
        list:[],
        type:[]
    },
    getters:{

    },
    actions:{
        fetchList({commit}){
            console.log('fetch')
            axios.get('/api/list').then(res=>{
                commit('getList',res.data)
            })
        }
    },
    mutations:{
        getList(state,payload){
            state.list = payload.list
            state.type = payload.type
        }
    }
}

export default home