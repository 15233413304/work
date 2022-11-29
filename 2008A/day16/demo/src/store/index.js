import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homeList:[],
  },
  getters: {},
  mutations: {
    setList(state,res){
      state.homeList = res
    }
  },
  actions: {
    async getList({commit},data){
      let { page, pageSize, tabIndex} = data
      let res = await axios.get('/api/list',{params: { page, pageSize, tabIndex} })
      commit('setList', res)
    }
  },
  modules: {},
});
