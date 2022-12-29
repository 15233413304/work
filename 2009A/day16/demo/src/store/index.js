import Vue from "vue";
import Vuex from "vuex";
// 引入vuex模块
import home from '@/store/module/home'
import cart from '@/store/module/cart'
// 引入数据持久化插件
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[
    createVuexPersistedState({
      key:'vuex',
      storage: localStorage,
    })
  ],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // 使用vuex的模块
    home,
    cart,
  },
});
