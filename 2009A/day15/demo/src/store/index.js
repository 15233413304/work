import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homeList:[],
    detailData:{},
  },
  getters: {},
  mutations: {
    setList(state,res){
      state.homeList = res
    },
    setDetail(state,res){
      state.detailData = res
    },
    setTalk(state,talk){
        // 判断有没有讨论列表
      if(state.detailData.talk){
        // 如果有 直接unshift
        return state.detailData.talk.unshift(talk)
      }
      // 没有talk列表 首先创建一个空数组
      // 向数组中追加内容
      // vue监听不到 新增的数组 可以通过 set方法来响应式的设置一个新的值
      // 在.vue组件中 可以使用 this.$set(要给什么响应式设置值, 你要设置的响应式值的名字, 这个值的内容)
      // 在js文件中 Vue.set(要给什么响应式设置值, 你要设置的响应式值的名字, 这个值的内容)
      Vue.set(state.detailData,'talk',[talk])

      // state.detailData.talk = []
      // state.detailData.talk.push(talk)
    }
  },
  actions: {
    // 页面中 通过 this.$sotore.dispatch('getList',参数) 就可以执行这个函数
    getList({commit},tab){
      axios.get('/api/list',{params: {tab}}).then(res=>{
        commit('setList',res)
      })
    },
    getDetail({commit},{tab,id}){
      axios.get('/api/detail',{params:{tab,id}}).then(res=>{
        commit('setDetail',res)
      })
    }
  },
  modules: {},
});
