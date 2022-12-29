let shop = {
    //命名空间 防止和其他vuex模块冲突
    namespaced: true,
    state:{
        // 购物车列表
        shopList:[],
    },
    getters:{
        // 使用getters计算商品数量
        shopCount(state){
            return state.shopList.reduce((prev,next)=>{
                return prev + next.count
            },0)
        }
    },
    mutations:{
        // 点击加入购物车执行的函数
        setShopList(state,data){
            // 首先通过findIndex判断出购物车有没有这个商品
            let index = state.shopList.findIndex(item=> item.id == data.id)
            if(index == -1){
                // 如果没有这个商品 直接添加到购物车中 并设置数量为1
                return state.shopList.push({...data,count:1})
            }
            // 有这个商品 数量+1即可
            state.shopList[index].count++
        }
    },
    actions:{}
}

export default shop