"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var shop = {
  //命名空间 防止和其他vuex模块冲突
  namespaced: true,
  state: {
    // 购物车列表
    shopList: []
  },
  getters: {
    // 使用getters计算商品数量
    shopCount: function shopCount(state) {
      return state.shopList.reduce(function (prev, next) {
        return prev + next.count;
      }, 0);
    }
  },
  mutations: {
    // 点击加入购物车执行的函数
    setShopList: function setShopList(state, data) {
      // 首先通过findIndex判断出购物车有没有这个商品
      var index = state.shopList.findIndex(function (item) {
        return item.id == data.id;
      });

      if (index == -1) {
        // 如果没有这个商品 直接添加到购物车中 并设置数量为1
        return state.shopList.push(_objectSpread({}, data, {
          count: 1
        }));
      } // 有这个商品 数量+1即可


      state.shopList[index].count++;
    }
  },
  actions: {}
};
var _default = shop;
exports["default"] = _default;