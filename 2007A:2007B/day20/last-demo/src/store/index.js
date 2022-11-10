import Vue from "vue";
import Vuex from "vuex";
import axios from '@/axios/axios'
// 引入数据持久化插件
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  // 使用数据持久化插件
  plugins: [
    createVuexPersistedState({
      key:'vuex',
      storage:window.localStorage,
      whiteList:[],
      blackList: [],
    }),
  ],
  state: {
    // 商品列表 
    list:[],
    // 收藏列表
    starList:[],
    // 购物车列表
    carList:[],
    // 历史搜索记录
    searchHistory:[]
  },
  getters: {
    // 购物车的商品数量
    shopCount(state){
      return state.carList.reduce((perv,next)=>{
        return  perv + next.count
      },0)
    },
    // 购物车选中商品的总价
    allPrice(state){
      let checkList = state.carList.filter(item=> item.isCheck)
      return checkList.reduce((perv,next)=>{
        return perv + next.count*next.price
      },0)*100
    }
  },
  mutations: {
    // 赋值商品列表
    setList(state,list){
      state.list = list
    },
    //点击收藏
    clickStar(state,id){
      state.starList.push(id)
    },
    // 点击取消
    clickUnStar(state,id){
      let index = state.starList.findIndex(item => item == id)
      state.starList.splice(index,1)
    },
    // 点击加入购物车
    clickShop(state,data){
      // console.log(data)
      let index = state.carList.findIndex(item=> item.id == data.id)
      // 如果已经存在该商品还继续点击加入购物车 数量加一
      if(index>-1){
        return state.carList[index].count++
      }
      state.carList.push(data)
    },
    // 选中单个商品
    changeCheck(state,data){
      // console.log(data)
      let index = state.carList.findIndex(item=> item.id == data.id)
      state.carList[index].isCheck = data.check
    },
    // 点击全选按钮
    checkAll(state,check){
      // console.log(check)
      state.carList.forEach(item=>{
        item.isCheck = check
      })
    },
    // 点击反选按钮
    checkOther(state){
      state.carList.forEach(item=>{
        item.isCheck = !item.isCheck
      })
    },
    // 设置搜索历史记录
    setHistory(state, title){
      if(!state.searchHistory.includes(title)){
        state.searchHistory.push(title)
      }
    },
    // 删除历史记录
    delHistory(state,index){
      state.searchHistory.splice(index,1)
    },
    // 清空历史记录
    clearHistory(state){
      state.searchHistory = []
    }
  },
  actions: {
    // 获取商品列表
    getList({commit},page){
      axios.get('/api/list',{params:{page}}).then(res=>{
        commit('setList',res.data)
      })
    },
  },
  modules: {},
});
