"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cart = {
  namespaced: true,
  state: {
    //购物车的商品列表
    cartList: []
  },
  getters: {
    // 购物车中商品的总数量
    shopCount: function shopCount(state) {
      return state.cartList.reduce(function (prev, next) {
        return prev + next.count;
      }, 0);
    }
  },
  mutations: {
    // 添加到购物车中
    addShop: function addShop(state, payload) {
      var index = state.cartList.findIndex(function (item) {
        return item.id == payload.id;
      });

      if (index == -1) {
        // 没有商品 直接添加 并且设置数量为1
        return state.cartList.push(_objectSpread({}, payload, {
          count: 1
        }));
      } // 有这个商品 数量++


      state.cartList[index].count++;
    },
    //删除商品
    delShop: function delShop(state, index) {
      state.cartList.splice(index, 1);
    }
  },
  actions: {}
};
var _default = cart;
exports["default"] = _default;