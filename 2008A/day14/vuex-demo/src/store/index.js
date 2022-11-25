import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http'
// 在数据持久化插件包中引入一个 createVuexPersistedState 函数
import { createVuexPersistedState } from "vue-persistedstate";

import shop from '@/store/module/shop'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      // 存到本地存储中 命名为（键名） vuex
      key:'vuex',
      // localStorage 或者 sessionStorage 两种方式
      storage:window.localStorage,
      // 白名单 需要存储的  不配置黑白名单时 默认全部储存
      whiteList:[],
      // 黑名单 不存的
      blackList: [],
    }),
  ],
  // state 相当于 vue文件中的 data函数 data(){return {}} 
  // 区别于state 是全局的状态管理仓库 任何组件中 都可以访问到vuex中的state
  // 在页面中 使用 this.$store.state.xxx 就可以访问state中的 xxx
  state: {
    // this.$store.state.list
    // 首页 商品列表数据
    list:[],
    // 收藏商品
    starList:[]
  },
  // getters 相当于 vue文件中的 computed 是一个全局的计算属性
  // this.$store.getters.xxx
  getters: {},
  // 同步操作的方法都存放在 mutations里 
  // 想改变state里的状态 必须要通过mutations 来改变
  // 在页面中 使用this.$store.commit('函数名一定要用引号',传递的值)
  // 在actions里的函数中 使用 上下文.commit('函数名一定要用引号',传递的值)
  mutations: {
    // mutations里的函数 会接收两个参数 第一个参数是 state 第二个参数是 传递过来的值
    setList(state,list){
      state.list = list
    },
    // 收藏/取消收藏
    setStar(state,id){
      // 使用js findIndex方法查找 有没有这个id  如果有 返回下标 如果没有返回-1
      let index = state.starList.findIndex(item=> item == id)
      // starList里没有这个商品
      if(index == -1){
        return state.starList.push(id)
      }
      // starList里有这个商品 使用js中的splice方法 删除掉这个id
      state.starList.splice(index,1)
    }
  },
  // 异步操作的方法 都存放在 actions里 如：调接口
  // 这里的函数 需要通知 mutations里的函数 来改变state里的状态
  // this.$store.dispatch('函数名一定要用引号',传递的值)
  actions: {
    // actions里定义的函数 会接收两个参数  第一个参数是 store的上下文 第二个参数是传过来的值
    async getList({commit}){
      // console.log(context)
      let res = await axios.get('/api/list')
      // context.commit('setList',res)
      commit('setList',res)
    }
  },
  // vuex模块化 可以将页面按需求 按逻辑分为多个模块仓库 统一管理
  modules: {
    shop,
  },
});
