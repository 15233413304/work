let cart = {
    namespaced: true,
    state:{
        //购物车的商品列表
        cartList:[]
    },
    getters:{
        // 购物车中商品的总数量
        shopCount(state){
            return state.cartList.reduce((prev,next)=>{
                return prev + next.count
            },0)
        }
    },
    mutations:{
        // 添加到购物车中
        addShop(state, payload){
            let index = state.cartList.findIndex(item=> item.id == payload.id)
            if(index == -1){
                // 没有商品 直接添加 并且设置数量为1
                return state.cartList.push({...payload,count:1})
            }
            // 有这个商品 数量++
            state.cartList[index].count++
        },
        //删除商品
        delShop(state,index){
            state.cartList.splice(index,1)
        }
    },
    actions:{

    }
}

export default cart