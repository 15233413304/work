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
      // 存到本地存储中 以什么键名来存
      key:'vuex',
      // 使用哪种本地存储 sessionStorage 或 localStorage
      storage:localStorage,
    })
  ],
  state: {
    // 首页列表
    homeList:[],
    // 加入购物车中的数据
    cartList:[],
    // 收藏的商品
    starList:[],
  },
  getters: {
    // 购物车中商品的总数量
    cartCount(state){
      return state.cartList.reduce((prev,next)=>{
        return prev + next.count
      },0)
    }
  },
  mutations: {
    // 将获取的数据 通过这个同步函数 赋值给homeList
    setList(state,res){
      state.homeList = res
    },
    // 加入购物车的函数
    setCartList(state,goods){
      let index = state.cartList.findIndex(item=> item.id == goods.id)
      if(index != -1){
        // 购物车列表中有这个商品 商品数量++
        state.cartList[index].count ++
        return
      }
      // 购物车列表中没有这个商品 直接添加到购物车 数量设置为1
      state.cartList.push({...goods,count:1})
    },
    // 收藏/取消收藏
    setStarList(state,{id,type}){
      // 自定义一个type 如果是 false 取消收藏    true 收藏
      if(type){
        // 收藏
        return state.starList.push(id)
      }
      //取消收藏
      let index = state.starList.findIndex(item=> item == id)
      state.starList.splice(index,1)
    },
    //删除购物车商品
    delShop(state,id){
      let index = state.cartList.findIndex(item=> item.id == id)
      state.cartList.splice(index,1)
    }
  },
  actions: {
    // 通过异步函数 调用接口 将返回的数据通知给同步函数
    getList({commit}){
      axios.get('/api/list').then(res=>{
        commit('setList',res)
      })
    }
  },
  modules: {},
});
