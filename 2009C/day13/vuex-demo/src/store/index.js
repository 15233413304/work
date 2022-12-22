import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  // 状态管理仓库 相当于全局的data 可以存放数据 任何组件都可以访问到
  // 在组件中如何使用？ this.$store.state
  state: {
    count:1
  },
  // 计算属性 相当于全局的computed 这里定义的计算属性会接收一个默认参数 state
  // 在组件中如何使用？ this,.$store.getters
  getters: {
    newCount(state){
      return state.count + '个'
    }
  },
  // vuex中 同步的方法存在这里 这里定义的函数有两个参数 
  // 第一个参数是 state 第二个参数是接收传过来的值(形参)
  // mutations里的函数 是唯一被允许改变vuex state里的值的方式
  // 在组件中如何使用？ this.$store.commit('事件名', 传值)
  mutations: {
    addCount(state,num){
      state.count += num
    },
    curCount(state,num){
      state.count -= num
    },
    setCount(state,num){
      state.count = num
    }
  },
  // vuex中 异步的方法存在这里 这里定义的函数有两个参数
  // 第一个参数是 上下文 类似于this 上下文指的是store这个类
  // 第二个参数是传过来的值
  // 在组件中如何使用？ this.$store.dispatch('事件名',传值)
  actions: {
    async getCount(ctx){
      let res = await axios.get('/api/count')
      // console.log(res,'res_____',ctx,'ctx___________')
      ctx.commit('setCount',res.data)
    }
  },
  // 模块化vuex 可以根据不同需求、功能拆分出多个模块单独管理
  modules: {},
});
