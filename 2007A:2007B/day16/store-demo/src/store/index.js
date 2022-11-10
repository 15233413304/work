import Vue from 'vue';
// 引入vuex提供的状态管理包
import Vuex from 'vuex';
import { createVuexPersistedState } from "vue-persistedstate";

import axios from '@/axios/axios'
// 使用 Vuex插件 (包)
Vue.use(Vuex);

// 抛出一个vuex的Store实例
export default new Vuex.Store({
    plugins: [
        createVuexPersistedState({
          key:'vuex',
          storage:window.localStorage,
          whiteList:[],
          blackList: [],
        }),
    ],
    // vuex提供的状态管理 用于存储源数据 公共的存储数据的库
    // this.$store.state
    state:{
        // 日常 轻奢 大怨种 tab切换的下标
        curTab: 0,
        // 加入购物车的商品
        carList:[],
        // 主页面的数据
        homeData:{}
    },
    // 类似于computed 返回一个计算后的值 getters和computed都可以缓存数据 
    // 只有依赖的数据改变时 getters和computed才会再次执行
    getters:{
        // 商品数量
        shopCount(state){
            // reduce js数组的操作方法 会循环数组
            // 第一个参数是一个回调函数，第二个参数是一个初始值
            // 回调函数的第一个参数是上一项 第二个参数是下一项
            return state.carList.reduce((pre,next)=>pre + next.count, 0)
        },
        // homeData(state){
        //     return state.homeData
        // }
        // 购物车商品总价
        allPrice(state){
            // 筛选出选中的商品
            let checkList = state.carList.filter(item=> item.isCheck)

            return checkList.reduce((pre,next)=>{
                return pre + next.price * next.count
            },0)
            // return 
        },
    },
 
    // 可以同步调用mutations里的函数 同步操作 
    // 注意⚠️ ******* state里的数据更改 只能通过mutations里的函数改变 *******
    // mutations里的函数 默认接收两个参数 第一个参数 state  第二个参数是 this.$store.commit()传过来的数据
    // 在.vue中怎么使用？ this.$store.commit('mutations里的函数名',数据 )  第二个参数是可选
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
        },
        setHomeData(state,res){
            state.homeData = res
        },
        // 点击全选
        checkAll(state,check){
            state.carList.forEach(item=>{
                item.isCheck = check
            })
        },
        // 点击单选
        checkItem(state,{id,isCheck}){
           let index =  state.carList.findIndex(item => item.id == id)
           state.carList[index].isCheck = isCheck
        },
        // 点击反选
        checkOther(state){
            state.carList.forEach(item=>{
                item.isCheck = !item.isCheck
            })
        },
        // 删除购物车商品
        deleteItem(state,id){
            let index = state.carList.findIndex(item => item.id == id)
            state.carList.splice(index,1)
        }
    },
    // 异步操作 
    // actions里的函数 默认接收两个参数 第一个参数是上下文  第二个参数是this.$store.dispatch() 传过来的数据
    // 在.vue中怎么使用？ this.$store.dispatch('actions里的函数名',数据 ) 第二个参数是可选
    actions:{
        // 可以做一些 比如 调用接口的操作
        getList({commit}){
            // 调用接口 返回home主页的数据
             axios.get('/api/list').then(res=>{
                // 通知mutations里的 setHomeData 函数
                commit('setHomeData',res)
             })
        }
    },


    // vuex的store可以分为多个模块
    modules:{},
})