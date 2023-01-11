import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http'
import { Message } from 'element-ui'
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

/**
 * @name: createVuexPersistedState
 * @param {key:string}
 * @param {storage}
 * @param {whiteList:Array<string>}
 * @param {blackList:Array<string>}
 * @return {storage}
 */

export default new Vuex.Store({
  plugins:[
    createVuexPersistedState({
      key:'vuex',
      storage: sessionStorage
    })
  ],
  state: {
    tableList:[],
    total:0,
    // 权限码
    PermissionStatus:-1,
    userName:''
  },
  getters: {},
  mutations: {
    // 对state里的 列表数据 和 总数据条数 进行赋值
    setTableList(state, {list,total}){
      state.tableList = list
      state.total = total
    },
    setPermission(state, {success, PermissionStatus,userName}){
      // 弹出一个成功的提示
      Message.success(success)
      // 权限码
      state.PermissionStatus = PermissionStatus
      // 当前登陆的用户名
      state.userName = userName
    }
  },
  actions: {
    // 获取表格数据
    getTableList({commit},{page, pageSize}){
      axios.get('/api/list',{params:{page, pageSize}}).then(res=>{
        commit('setTableList',res)
      })
    },
    userLogin({commit},{userName, password}){
      axios.get('/api/login',{params:{userName, password}}).then(res=>{
        if(res.error){
          return Message.error(res.error)
        }
        // 存一个token状态
        localStorage.setItem('token', +new Date())
        commit('setPermission',res)
      })
    }
  },
  modules: {},
});
