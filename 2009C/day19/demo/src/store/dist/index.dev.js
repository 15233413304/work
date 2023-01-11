"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _vuePersistedstate = require("vue-persistedstate");

var _http = _interopRequireDefault(require("@/utils/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  // plugins:[
  //   createVuexPersistedState({
  //     key:'vuex',
  //     storage:localStorage,
  //   })
  // ],
  state: {
    // 首页的数据列表
    homeList: [],
    // 服务器中数据的总数量
    total: 0,
    // 收藏商品
    starList: [],
    // 购物车列表
    cartList: []
  },
  getters: {
    shopCount: function shopCount(state) {
      return state.cartList.reduce(function (prev, next) {
        return prev + next.count;
      }, 0);
    }
  },
  // 处理同步的函数 都写在mutations里  通过commit('mutations里的函数名',数据)来通知这里的函数执行
  // 在vuex中 改变state里数据的值 一定要通过mutations里的函数来改变
  mutations: {
    setHomeList: function setHomeList(state, _ref) {
      var list = _ref.list,
          total = _ref.total;
      state.homeList = list;
      state.total = total;
    },
    // 添加到收藏列表
    createStar: function createStar(state, id) {
      state.starList.push(id);
    },
    // 取消收藏
    delStar: function delStar(state, id) {
      var index = state.starList.findIndex(function (item) {
        return item.id == id;
      });
      state.starList.splice(index, 1);
    },
    // 加入购物车
    addShop: function addShop(state, goods) {
      // let a = {name:'1'}
      // let b = {...a} 
      // b.name='2'
      // console.log(a)
      //判断购物车中有没有这个商品 如果有这个商品那就是数量++
      var index = state.cartList.findIndex(function (item) {
        return item.id == goods.id;
      });

      if (index > -1) {
        // 存在这个商品
        return state.cartList[index].count++;
      } // {...goods} 做了什么？  他把对象或数组解构  如果说 ...外面是对象
      //  那么会把对象解构成 { 键名: 键值 } 不会操作原数据
      // {  id:"商品id",
      //    name:'商品名',
      //    desc:'商品描述',
      //    price: '价格',
      //    img:'图片',
      //    banner: "['五个图片']",
      // }
      // 不存在这个商品 加入到购物车中并且 设置数量为1


      state.cartList.push(_objectSpread({}, goods, {
        count: 1
      }));
    },
    delShop: function delShop(state, id) {
      var index = state.cartList.findIndex(function (item) {
        return item.id == id;
      });
      state.cartList.splice(index, 1);
    }
  },
  // 处理异步的函数 都写在actions里 通过dispatch('actions里的函数名',数据)来通知这里的函数执行
  actions: {
    // 第一个参数是 上下文 context 指的是 new Vuex.Store这个实例
    // 可以通过解构 拿到commit方法 用来通知同步函数 给state赋值
    // 第二个参数是 组件传过来的数据
    getHomeList: function getHomeList(_ref2, _ref3) {
      var commit = _ref2.commit;
      var page = _ref3.page,
          pageSize = _ref3.pageSize;

      //获取主页列表数据
      _http["default"].get('/api/list', {
        params: {
          page: page,
          pageSize: pageSize
        }
      }).then(function (res) {
        commit('setHomeList', res);
      });
    }
  },
  modules: {}
});

exports["default"] = _default;