import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homeList:[]
  },
  getters: {},
  mutations: {
    setList(state,res){
      state.homeList = res
    }
  },
  actions: {
    getList({commit}){
      axios.get('/api/list').then(res=>{
        commit('setList',res)
      })
    }
  },
  modules: {},
});
