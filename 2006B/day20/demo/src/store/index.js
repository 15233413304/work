import Vue from "vue";
import Vuex from "vuex";
import login from './module/login'
import home from './module/home'
import shop from './module/shop'
import address from './module/address'
import axios from "@/axios/axios";

import { createVuexPersistedState } from "vue-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      key:'vuex',
      storage:window.localStorage,
      whiteList:[],
      blackList: [],
    }),
  ],
  state: {
    userList:[],
    total:0,
  },
  getters: {},
  // 同步操作的函数 最终改变state里的值都需要通过这里的函数来改变 这里的函数有两个参数 第一个是state 第二个是commit传过的值
  mutations: {
    setUserList(state,content){
      state.userList = content.list
      state.total = content.total
    }
  },
  // 异步操作的函数 这里的函数有两个参数 第一个参数是上下文(相当于this 也就是store) 第二个参数是dispatch传过来的值
  actions: {
    getUserList(ctx,{page,pageSize}){
      console.log(ctx)
      axios.get('/api/user',{params:{page,pageSize} }).then(res=>{
        ctx.commit('setUserList',res.data)
      })
    }
  },
  modules: {
    login,
    home,
    shop,
    address,
  },
});
