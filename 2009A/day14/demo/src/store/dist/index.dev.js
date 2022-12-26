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
    // 存到本地存储中 以什么键名来存
    key: 'vuex',
    // 使用哪种本地存储 sessionStorage 或 localStorage
    storage: localStorage
  })],
  state: {
    // 首页列表
    homeList: [],
    // 加入购物车中的数据
    cartList: [],
    // 收藏的商品
    starList: []
  },
  getters: {
    // 购物车中商品的总数量
    cartCount: function cartCount(state) {
      return state.cartList.reduce(function (prev, next) {
        return prev + next.count;
      }, 0);
    }
  },
  mutations: {
    // 将获取的数据 通过这个同步函数 赋值给homeList
    setList: function setList(state, res) {
      state.homeList = res;
    },
    // 加入购物车的函数
    setCartList: function setCartList(state, goods) {
      var index = state.cartList.findIndex(function (item) {
        return item.id == goods.id;
      });

      if (index != -1) {
        // 购物车列表中有这个商品 商品数量++
        state.cartList[index].count++;
        return;
      } // 购物车列表中没有这个商品 直接添加到购物车 数量设置为1


      state.cartList.push(_objectSpread({}, goods, {
        count: 1
      }));
    },
    // 收藏/取消收藏
    setStarList: function setStarList(state, _ref) {
      var id = _ref.id,
          type = _ref.type;

      // 自定义一个type 如果是 false 取消收藏    true 收藏
      if (type) {
        // 收藏
        return state.starList.push(id);
      } //取消收藏


      var index = state.starList.findIndex(function (item) {
        return item == id;
      });
      state.starList.splice(index, 1);
    },
    //删除购物车商品
    delShop: function delShop(state, id) {
      var index = state.cartList.findIndex(function (item) {
        return item.id == id;
      });
      state.cartList.splice(index, 1);
    }
  },
  actions: {
    // 通过异步函数 调用接口 将返回的数据通知给同步函数
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