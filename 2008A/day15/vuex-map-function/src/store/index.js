import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list:[],
    name:'张三'
  },
  getters: {

  },
  mutations: {
    // 第一个参数是state 第二个参数是传递过来的数据
    setList(state,res){
      // 将state里面的list 赋值为接口返回的数据
      state.list = res
    }
  },
  actions: {
    async getList({commit}){
      // 获取接口 将返回的数据命名为res
      let res = await axios.get('/api/list')
      // 使用上下文参数中的commit属性方法 来通知mutations执行 并把接口返回的数据传递过去
      commit('setList',res)
    }
  },
  modules: {},
});
