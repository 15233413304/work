import aioxs from '@/utils/https'
let home = {
    //命名空间 防止和其他vuex模块冲突
    namespaced: true,
    state:{
        // 首页列表
        homeList:[],
        // 总数据条数
        total:0,
        // 收藏列表
        starList:[],
    },
    getters:{},
    mutations:{
        // mutations里的函数 是同步的 只做给state赋值的操作
        setHomeList(state,{list,total}){
            state.homeList = list
            state.total = total
        },
        // 收藏
        setOnStar(state,id){
            // 直接将商品id添加到收藏列表中
            state.starList.push(id)
        },
        // 取消收藏
        setOffStar(state,id){
            //筛选出要取消收藏的商品
            let index = state.starList.findIndex(item => item == id)
            // 将商品id删掉
            state.starList.splice(index,1)
        }
    },
    actions:{
      // actions里的函数可以处理异步 拿到异步处理后结果 commit给同步方法  
      getHomeList({commit},{page,pageSize}){
        aioxs.get('/api/list',{params:{page,pageSize}}).then(res=>{
            commit('setHomeList',res)
        })
      }
    }
}

export default home