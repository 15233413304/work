import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http/index'
import { createVuexPersistedState } from 'vue-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[
    new createVuexPersistedState({
      key:'vuex',
      stroage:'localStroage'
    })
  ],
  state: {
    username:'',
    userList:[]
  },
  getters: {},
  mutations: {
    setToken(state,data){
      localStorage.setItem('token',data.token)
      // 权限
      localStorage.setItem('permission',data.code)
      // 登陆成功时展示一个当前登陆人
      state.username = data.username
    },
    setList(state,data){
      state.userList = data
    },
  },
  actions: {
    // 登陆校验用户是否正确 如果正确 登陆成功并存一个token
    async userLogin({commit},form){
      let { username, password } = form
      let res = await axios.get('/api/login',{params: {username,password}})
      // 如果登陆成功 接口会返回token
      if(res.token){
        commit('setToken',{...res,username})
      }
    },
    // 获取用户列表
    async getUserList({commit}){
      let res = await axios.get('/api/list')
      commit('setList',res)
    },
    // 编辑用户信息
    async editUserList({commit},data){
      let res = await axios.get('/api/update',{params:{...data}})
      // 调用接口后 将用户列表变成编辑后的
      commit('setList',res)
    },
    // 新增用户
    async addUserList({commit},data){
      let res = await axios.get('/api/add',{params:{...data}})
      // 调用接口后 将用户列表新增内容展示到上方
      commit('setList',res)
    },
    async delUser({commit},id){
      let res = await axios.get('/api/delete',{params:{id}})
      // 调用接口后 展示删除用户后的列表
      commit('setList',res)
    }
  },
  modules: {},
});
