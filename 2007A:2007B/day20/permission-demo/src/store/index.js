import Vue from "vue";
import Vuex from "vuex";
import axios from '@/axios/axios'
import Router from '@/router/index'
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[
    createVuexPersistedState({
      key: 'vuex',
      storage: localStorage,
    })
  ],
  state: {
    userData:{},
    // 当前登陆的用户信息
    loginUser:{},
    // tab切换
    tab:'0'
  },
  getters: {},
  mutations: {
    setLogin(state,data){
      state.loginUser = data
    },
    changeTab(state,tab){
      state.tab = tab
    },
    // 设置列表数据
    setList(state,data){
      state.userData = data
    },
  },
  actions: {
    // 登陆
    userLogin({commit},data){
      axios.get('/api/login',{params: data}).then(res=>{
        if(res.data.code == 200){
          // 设置用户信息
          commit('setLogin',{...res.data})
          // 存一个token 防止被路由拦截
          localStorage.setItem('token',1)
          // 登陆成功后 跳转路由
          console.log(Router.push('/role'))
          // 切换tab
          commit('changeTab','2')
        }
      })
    },
    // 获取列表
    getList({commit},{page,pageSize}){
      axios.get('/api/list',{params:{page,pageSize}}).then(res=>{
        commit('setList',res.data)
      })
    },
    // 删除用户
    deleteUser(context,id){
      axios.get('/api/delete',{params: {id}})
    }
  },
  modules: {},
});
