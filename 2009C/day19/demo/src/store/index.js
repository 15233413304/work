import Vue from "vue";
import Vuex from "vuex";
// 引入数据持久化插件
import { createVuexPersistedState } from 'vue-persistedstate'
import axios from '@/utils/http'
Vue.use(Vuex);

export default new Vuex.Store({
  // plugins:[
  //   createVuexPersistedState({
  //     key:'vuex',
  //     storage:localStorage,
  //   })
  // ],
  state: {
    // 首页的数据列表
    homeList:[],
    // 服务器中数据的总数量
    total:0,
    // 收藏商品
    starList:[],
    // 购物车列表
    cartList:[],
  },
  getters: {
    shopCount(state){
      return state.cartList.reduce((prev,next)=>{
        return prev + next.count
      },0)
    }
  },
  // 处理同步的函数 都写在mutations里  通过commit('mutations里的函数名',数据)来通知这里的函数执行
  // 在vuex中 改变state里数据的值 一定要通过mutations里的函数来改变
  mutations: {
    setHomeList(state,{list, total}){
      state.homeList = list
      state.total = total
    },
    // 添加到收藏列表
    createStar(state, id){
      state.starList.push(id)
    },
    // 取消收藏
    delStar(state,id){
      let index = state.starList.findIndex(item=> item.id == id)
      state.starList.splice(index,1)
    },
    // 加入购物车
    addShop(state,goods){
      // let a = {name:'1'}
      // let b = {...a} 
      // b.name='2'
      // console.log(a)

      //判断购物车中有没有这个商品 如果有这个商品那就是数量++
      let index = state.cartList.findIndex(item=> item.id == goods.id)
      if(index >-1){
        // 存在这个商品
        return state.cartList[index].count++
      }
      // {...goods} 做了什么？  他把对象或数组解构  如果说 ...外面是对象
      //  那么会把对象解构成 { 键名: 键值 } 不会操作原数据
      // {  id:"商品id",
      //    name:'商品名',
      //    desc:'商品描述',
      //    price: '价格',
      //    img:'图片',
      //    banner: "['五个图片']",
      // }
      // 不存在这个商品 加入到购物车中并且 设置数量为1
      state.cartList.push({...goods,count:1})
    },
    delShop(state,id){
      let index = state.cartList.findIndex(item=> item.id == id)
      state.cartList.splice(index,1)
    }
  },
  // 处理异步的函数 都写在actions里 通过dispatch('actions里的函数名',数据)来通知这里的函数执行
  actions: {
    // 第一个参数是 上下文 context 指的是 new Vuex.Store这个实例
    // 可以通过解构 拿到commit方法 用来通知同步函数 给state赋值
    // 第二个参数是 组件传过来的数据
    getHomeList({commit},{page, pageSize}){
      //获取主页列表数据
      axios.get('/api/list',{params:{page, pageSize}}).then(res=>{
        commit('setHomeList',res)
      })
    }
  },
  modules: {},
});
