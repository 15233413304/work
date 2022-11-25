let shop = {
    // 命名空间， 防止与其他vuex模块冲突
    namespaced: true,
    state:{
        // 购物车的商品列表
        shopList:[]
    },
    getters:{
        // getters里的函数 可以接收到一个state
        shopCount(state){
            // 使用js中的 求和方法 reduce 
            // reduce 前两个参数 一个回调函数  一个是初始值
            // 回调函数中 也有两个参数，第一个参数是 上次计算的结果 第二个参数是下一个要计算的值
            // 第一次执行时 第一个参数是初始值
            return state.shopList.reduce((prev,next)=>{
                return prev + next.count
            },0)
        }
    },
    mutations:{
        // 加入购物车
        setShop(state,data){
            // console.log({...data,count:1})
            // 判断购物车列表里 有没有现在点击加入购物车的这个商品
            let shopIndex = state.shopList.findIndex(item=> item.id == data.id)
            if(shopIndex == -1){
                // 没有这个商品 点击加入购物车 直接push  加上一个数量为1的参数
                state.shopList.push({
                    // 将传过来的数据解构
                    ...data,
                    // 新增一个属性 数量：1
                    count:1,
                })
                return
            }
            // 有这个商品 再次点击加入购物车时 使商品的数量+1
            state.shopList[shopIndex].count += 1
        },
        // 删除购物车商品
        delShop(state,id){
            let index = state.shopList.findIndex(item=> item.id == id)
            state.shopList.splice(index,1)
        }
    },
    actions:{}
}

export default shop