import Vue from "vue";
import Vuex from "vuex";
import login from './module/login'
import home from './module/home'
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
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    home
  },
});
