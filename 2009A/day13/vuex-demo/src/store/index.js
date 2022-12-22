import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  // 相当于是一个全局的data 所有组件中都可以访问到 用于存放源数据 状态
  // 如何使用 this.$store.state
  state: {
    count:1
  },
  // 计算属性 相当于全局的 computed 可以返回计算后的值 这里的计算属性 会接收到一个默认参数 state
  // 如何使用 this.$store.getters
  getters: {},
  // 用于存放同步事件的方法 是vuex中 唯一一种允许改变state里 值/状态 的方式
  // 如何使用？ this.$store.commit('事件名',需要传的数据)
  mutations: {
    // 在这里定义的函数 会接受两个参数
    // 第一个参数是state 第二个参数是传过来的值(形参什么命名都可以 语义化即可)
    addCount(state,num){
      state.count += num
    },
    curCount(state,num){
      state.count -= num
    },
    SetCount(state,num){
      state.count = num
    }
  },
  // 用于存放异步事件的方法 最终要通知同步事件来改变state里的值 不能直接改变state里的值
  // 如何使用？this.$store.dispatch('事件名',需要传的数据)
  actions: {
    // 这里定义的函数有两个参数
    // 第一个参数是上下文 也就是 store
    // 第二个参数是传过来的值(形参)
    async getCount({commit}){
      let res = await axios.get('/api/req')
        // console.log(res)
        commit('SetCount',res.data)
    }
  },
  // vuex模块化
  modules: {},
});
