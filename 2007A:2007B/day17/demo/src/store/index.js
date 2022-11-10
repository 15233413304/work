import Vue from "vue";
import Vuex from "vuex";
// 引入home.js 
import home from '@/store/module/home'
import address from '@/store/module/address'

import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  // plugins插件 数据持久化
  plugins:  [
    createVuexPersistedState({
      key:'vuex',
      storage:window.sessionStorage,
      whiteList:[],
      blackList: [],
    }),
  ],
  // 存储状态（源数据）
  state: {

  },
  // 计算属性 类似于computed 
  //getters里的函数会默认接受一个参数 state
  getters: {},
  // 存放同步操作函数
  // mutations 里的函数 有两个参数 第一个参数：state，第二个参数：传过来的值
  // 在页面上 通过this.$store.commit("函数名",传过去的值)
  mutations: {},
  // 存放异步操作函数
  // actions 里的函数 有两个参数 第一个参数： 上下文（store），第二个参数：传过来的值
  // 在页面上通过 this.$sotre.dispatch("函数名",传过去的值)
  actions: {},
  // 模块化vuex
  modules: {
    // 使用home首页模块
    home,
    // 使用address地址管理模块
    address,
  },
});
