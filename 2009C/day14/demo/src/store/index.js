import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http'
// 引入数据持久化插件
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  // 使用插件
  plugins:[
    createVuexPersistedState({
      // 存到本地存储中 使用什么键名
      key:'vuex',
      // 使用哪种本地存储 localStorage 还是 sessionStorage 
      storage: localStorage,
    })
  ],
  state: {
    // 首页列表
    homeList:[],
    // 购物车列表
    cartList:[],
    // 收藏列表
    starList:[],
  },
  getters: {
    // 计算出购物车中商品的数量
    shopCount(state){
      return state.cartList.reduce((prev,next)=>{
        return prev + next.count
      },0)
    }
  },
  mutations: {
    // 同步方法 设置homeList的值 将接口返回的数据进行赋值
    setList(state,res){
      state.homeList = res
    },
    // 将商品加入购物车
    setCartList(state,goods){
      let index = state.cartList.findIndex(item=> item.id == goods.id)
      if(index !=-1 ){
        // 在购物车列表中有这个商品
        return state.cartList[index].count ++
      }
      // 在购物车列表中没这个商品 将商品加入到购物车中 并设置数量为1
      state.cartList.push({...goods,count:1})
    },
    // 收藏/取消收藏
    setStarList(state,{id,type}){
      // type 为true时收藏  type为false时取消收藏
      if(type){
        // 收藏
        return state.starList.push(id)
      }
      // 取消收藏
      let index = state.starList.findIndex(item => item == id)
      state.starList.splice(index,1)
    },
    // 删除购物车商品
    delShop(state,id){
      // 从购物车列表中删除符合传过来id的商品
      let index = state.cartList.findIndex(item => item.id = id)
      state.cartList.splice(index,1)
    }
  },
  actions: {
    // 异步方法 获取首页列表 并将数据传给同步方法 setList
    getList({commit}){
      axios.get('/api/list').then(res=>{
        commit('setList',res)
      })
    }
  },
  modules: {},
});
