import Vue from "vue";
import Vuex from "vuex";
// 引入vuex模块文件
// 主页列表相关逻辑
import home from '@/store/module/home'
// 购物车相关逻辑
import shop from '@/store/module/shop'
import address from '@/store/module/address'
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[
    createVuexPersistedState({
      key:'vuex',
      storage: localStorage
    })
  ],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // 使用模块
    home,
    shop,
    address,
  },
});
