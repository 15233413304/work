const shop = {
    // 命名空间 防止和其他模块命名相同导致冲突(污染)
    namespaced: true,
    state: {
      // 购物车列表
      list:[]
    },
    getters: {},
    mutations: {
      setShopList(state,goods){
        // 加入购物车去重
        // every判断 每一项都符合返回true
        // if(state.list.every(item => item.id !== goods.id)){
        //   state.list.push(goods)
        // }
        // some判断 某一条符合就会返回true
        if(!state.list.some(item => item.id === goods.id)){
          // {
          //   id: "530000201204021765",
          //   img: "http://dummyimage.com/100x100/79f279",
          //   price: 39.8,
          //   title: "史信",
          //   num:1,
          // }
          state.list.push({...goods,num:1})
        }
      },
      // 增加商品数量
      addShopNum(state,id){
        // 找到我们要操作的商品下标
        let index = state.list.findIndex(item => item.id === id)
        state.list[index].num ++
      },
      // 减少商品数量
      cutShopNum(state,id){
        // 找到我们要操作的商品下标
        let index = state.list.findIndex(item => item.id === id)
        if(state.list[index].num !== 1){
          state.list[index].num --
        }
      },
    },
    actions: {},
}

export default shop

