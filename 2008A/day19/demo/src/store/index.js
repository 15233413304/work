import Vue from "vue";
import Vuex from "vuex";
import axios from '@/utils/http'
import { createVuexPersistedState } from 'vue-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[
    createVuexPersistedState({
      key:'vuex',
      stroage:'localStroage',
    })
  ],
  state: {
    // 主页商品列表
    homeList:[],
    // 购物车商品列表
    shopList:[],
    // 收获地址列表
    addressList:[],
    // {
    //   id: '1',
    //   name: '张三',
    //   tel: '13000000000',
    //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    //   isDefault: true,
    // },
    // 提交订单的商品
    submitShop:[],
    // 搜索内容的列表
    searchList:[],
    // 搜索历史记录的列表
    searchHistory: [],
  },
  getters: {},
  mutations: {
    setList(state,res){
      state.homeList = res
    },
    setShop(state,data){
      // 获取商品的下标 通过原生js方法 findIndex 查找商品下标 
      // 如果没有这个商品 返回-1
      // 如果有这个商品 那就返回这个商品的下标
      let index = state.shopList.findIndex(item => item.id == data.id)
      // 判断购物车列表里有没有这个商品 如果有 数量+1
      if(index != -1){
        return state.shopList[index].count++
      }
      // 如果没有这个商品 那就push一个这样的商品 并且数量设置为1
      state.shopList.push({...data,count:1})
    },
    // 新增/编辑 收获地址
    EditAddress(state,data){
      let index = state.addressList.findIndex(item => item.id == data.id)
      // 设为默认地址
      if(data.isDefault){
        // 将其他地址全部设置为非默认
        state.addressList.forEach(item=>{
          item.isDefault = false
        })
        // 编辑地址
        if(index != -1){
          // 删除这个地址
          state.addressList.splice(index,1)
        }
        // 新增地址
        // 从数组头部追加
        return state.addressList.unshift({...data})
      }
      // 没设置为默认地址
      // 编辑
      if(index != -1){
        return state.addressList.splice(index,1,{...data})
      }
      // 新增
      state.addressList.push({...data})
    },
    // 删除地址
    DelAddress(state,id){
      let index = state.addressList.findIndex(item=> item.id ==id)
      state.addressList.splice(index,1)
    },
    // 删除商品
    delShop(state,id){
      let index = state.shopList.findIndex(item=> item.id == id)
      state.shopList.splice(index,1)
    },
    //提交订单
    setSubmit(state,list){
      state.submitShop = [...state.submitShop].concat([...list])
    },
    // 给搜索内容的列表赋值
    setSearchList(state,{res,value}){
      state.searchList = res
      // 将搜索内容添加到历史记录中
      state.searchHistory.push(value)
      // 去重
      state.searchHistory = [...new Set(state.searchHistory)]
    },
    // 删除 单个历史记录
    delHistory(state,name){
      // 找到要删除历史记录标签的下标
      let index = state.searchHistory.findIndex(item=> item == name)
      // 删除这个历史记录
      state.searchHistory.splice(index,1)
    },
    // 清空所有历史记录
    clearHistory(state){
      state.searchHistory = []
    }
  },
  actions: {
    // 获取首页列表
    async getList({commit},data){
      let { page, pageSize, tabIndex} = data
      let res = await axios.get('/api/list',{params: { page, pageSize, tabIndex} })
      commit('setList', res)
    },
    // 删除提交订单后 购物车里的商品
    delSubmitShop({commit},id){
      commit('delShop',id)
    },
    // 获取模糊搜索的内容
    async getSearchList({commit},data){
      let { tabIndex, value } = data
      let res = await axios.get('/api/search',{params:{ tabIndex, value }})
      commit('setSearchList',{res,value})
    }
  },
  modules: {},
});
