"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _http = _interopRequireDefault(require("@/utils/http"));

var _vuePersistedstate = require("vue-persistedstate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  // 使用插件
  plugins: [(0, _vuePersistedstate.createVuexPersistedState)({
    // 存到本地存储中 使用什么键名
    key: 'vuex',
    // 使用哪种本地存储 localStorage 还是 sessionStorage 
    storage: localStorage
  })],
  state: {
    // 首页列表
    homeList: [],
    // 购物车列表
    cartList: [],
    // 收藏列表
    starList: []
  },
  getters: {
    // 计算出购物车中商品的数量
    shopCount: function shopCount(state) {
      return state.cartList.reduce(function (prev, next) {
        return prev + next.count;
      }, 0);
    }
  },
  mutations: {
    // 同步方法 设置homeList的值 将接口返回的数据进行赋值
    setList: function setList(state, res) {
      state.homeList = res;
    },
    // 将商品加入购物车
    setCartList: function setCartList(state, goods) {
      var index = state.cartList.findIndex(function (item) {
        return item.id == goods.id;
      });

      if (index != -1) {
        // 在购物车列表中有这个商品
        return state.cartList[index].count++;
      } // 在购物车列表中没这个商品 将商品加入到购物车中 并设置数量为1


      state.cartList.push(_objectSpread({}, goods, {
        count: 1
      }));
    },
    // 收藏/取消收藏
    setStarList: function setStarList(state, _ref) {
      var id = _ref.id,
          type = _ref.type;

      // type 为true时收藏  type为false时取消收藏
      if (type) {
        // 收藏
        return state.starList.push(id);
      } // 取消收藏


      var index = state.starList.findIndex(function (item) {
        return item == id;
      });
      state.starList.splice(index, 1);
    },
    // 删除购物车商品
    delShop: function delShop(state, id) {
      // 从购物车列表中删除符合传过来id的商品
      var index = state.cartList.findIndex(function (item) {
        return item.id = id;
      });
      state.cartList.splice(index, 1);
    }
  },
  actions: {
    // 异步方法 获取首页列表 并将数据传给同步方法 setList
    getList: function getList(_ref2) {
      var commit = _ref2.commit;

      _http["default"].get('/api/list').then(function (res) {
        commit('setList', res);
      });
    }
  },
  modules: {}
});

exports["default"] = _default;