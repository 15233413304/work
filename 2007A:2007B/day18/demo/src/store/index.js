import Vue from "vue";
import Vuex from "vuex";
import { Toast } from 'vant';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    users:[],
    // 验证码
    code:'',
  },
  getters: {},


  mutations: {
    // 登陆
    setUser(state,abc){
      console.log(abc)
    },
    // 发送验证码
    sendCode(state){
      // 6位随机数
      state.code = `${(Math.random()*1000000).toFixed()}`
      Toast(state.code)
      console.log(state.code)
    }
  },
  actions: {

  },
  modules: {},
});
