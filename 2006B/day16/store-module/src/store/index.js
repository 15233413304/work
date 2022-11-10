import Vue from "vue";
import Vuex from "vuex";
import { createVuexPersistedState } from "vue-persistedstate";
import home from './module/home.js'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[
    createVuexPersistedState({
      key:'vuex',
      storage:window.localStorage,
      whiteList:[],
      blackList: [],
    }),
  ],
  state: {
    isLogin:false,
    userInfo:{},
  },
  getters: {},
  mutations: {
    login(state,payload){
      state.isLogin = true
      state.userInfo = payload
    }
  },
  actions: {},
  modules: {
    H:home
  },
});
