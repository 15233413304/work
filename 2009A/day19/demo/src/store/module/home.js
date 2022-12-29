import axios from '@/utils/http'
let home = {
    // 命名空间 防止与其他vuex业务模块因同一个命名引起的冲突
    namespaced: true,
    state:{
        // 主页列表
        homeList:[],
        // 总数据条数
        total:0,
        // 收藏的商品列表
        starList:[],
        // 搜索商品的历史记录列表
        historyList:[],
    },
    getters:{},
    mutations:{
        // 拿到异步处理后返回的数据 通过同步的函数对state进行赋值
        setHomeList(state,{list,total}){
            state.homeList = list
            state.total = total
        },
        setOnStar(state,id){
            // 直接添加到收藏列表
            state.starList.push(id)
        },
        setOffStar(state,id){
            // 从收藏列表中找到要取消收藏的商品id下标
            let index = state.starList.findIndex(item=> item == id)
            // 将该商品id删掉
            state.starList.splice(index,1)
        },
        // 新增搜索历史记录
        createHistory(state,value){
            // 先搜索一下历史记录列表中是否有这个搜索内容
            let index = state.historyList.findIndex(item=> item == value)
            if(index == -1){
                // 没有这个内容 则添加到历史记录中
                state.historyList.push(value)
            }
        },
        // 删除搜索历史记录
        delHistory(state,index){
            state.historyList.splice(index,1)
        }
    },
    actions:{
        getList({commit},{page,pageSize}){
            // 通过actions里的函数 处理好异步操作后 返回的结果通知给同步函数
            axios.get('/api/list',{params:{page,pageSize}}).then(res=>{
                commit('setHomeList',res)
            })
        }
    }
}
// 一定要记得抛出模块
export default home;