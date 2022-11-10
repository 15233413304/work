import Vue from 'vue';
// 引入vuex提供的状态管理包
import Vuex from 'vuex';
// 使用 Vuex插件 (包)
Vue.use(Vuex);

// 抛出一个vuex的Store实例
export default new Vuex.Store({
    // vuex提供的状态管理 用于存储源数据 公共的存储数据的库
    // this.$store.state
    state:{
        // 日常 轻奢 大怨种 tab切换的下标
        curTab: 0,
        // 加入购物车的商品
        carList:[]
    },
    // 类似于computed 返回一个计算后的值
    getters:{
        // 商品数量
        shopCount(state){
            // reduce js数组的操作方法 会循环数组
            // 第一个参数是一个回调函数，第二个参数是一个初始值
            // 回调函数的第一个参数是上一项 第二个参数是下一项
            return state.carList.reduce((pre,next)=>pre + next.count, 0)
        }
    },
 
    // 可以同步调用mutations里的函数 同步操作 state里的数据更改 只能通过mutations里的函数
    // mutations里的函数 默认接受两个参数 第一个参数 state  第二个参数是 this.$store.commit()传过来的值
    // 在.vue中怎么使用？ this.$store.commit()
    mutations:{
        setCurTab(state,data){
            state.curTab = data
        },
        setCarList(state,data){
            // 加入购物车 如果商品存在 数量加1
            // 如果购物车列表里 carList里 有这个商品 返回这个商品下标 如果没有 返回-1
            let index = state.carList.findIndex(item=> item.id == data.id)
            // 没有这个商品
            if(index == -1){
              return state.carList.push(data)
            }
            // 有这个商品 直接通过商品下标 数量+1
            state.carList[index].count +=1
        }
    },



    // 异步操作
    actions:{},
    // vuex的store可以分为多个模块
    modules:{},
})