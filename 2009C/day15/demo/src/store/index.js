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
    setList(state, payload){
      // 这个payload 就是传过来的res 它是一个形参 名字可以自定义
      state.homeList = payload
    },
    setDetail(state, payload){
      state.detailData = payload
    },
    setTalk(state, talk){
      // 判断 这个详情页的商品内 有没有评论
      if(state.detailData.talkList){
        // 有评论列表的 新增的评论 追加到列表的顶部 unshift
        return state.detailData.talkList.unshift(talk)
      }
      // 没有评论列表
      // 因为vue 无法监听到新增的数组这种操作 所以需要使用set方法动态创建一个数组
      // 在.vue组件中 我们可以使用 this.$set(你要设置的数组或对象在什么地方,'属性值的键名',设置值)
      // 在.js 文件中 引入Vue后 使用 Vue.set()

      // 在state.detailData中 动态创建一个名为 talkList 的属性 属性的值为 [talk]
      Vue.set(state.detailData,'talkList',[talk])
    }
  },
  actions: {
    // 在.vue组件中 使用 this.$store.dispatch('getList',参数) 就可以调用这个函数
    getList({commit}, tab){
      // context.commit('需要触发的Mutation函数')
     axios.get('/api/list',{params: {tab}}).then(res=>{
      // acitons里的函数处理完异步操作后 还需要通知mutataions里的函数来改变state
      commit('setList', res)
     })
    },
    getDetail({commit}, {tab,id}){
      axios.get('/api/detail',{params:{ tab,id }}).then(res=>{
        commit('setDetail', res)
      })
    }
  },
  modules: {},
});
