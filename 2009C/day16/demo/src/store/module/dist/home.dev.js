"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _https = _interopRequireDefault(require("@/utils/https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var home = {
  //命名空间 防止和其他vuex模块冲突
  namespaced: true,
  state: {
    // 首页列表
    homeList: [],
    // 总数据条数
    total: 0,
    // 收藏列表
    starList: []
  },
  getters: {},
  mutations: {
    // mutations里的函数 是同步的 只做给state赋值的操作
    setHomeList: function setHomeList(state, _ref) {
      var list = _ref.list,
          total = _ref.total;
      state.homeList = list;
      state.total = total;
    },
    // 收藏
    setOnStar: function setOnStar(state, id) {
      // 直接将商品id添加到收藏列表中
      state.starList.push(id);
    },
    // 取消收藏
    setOffStar: function setOffStar(state, id) {
      //筛选出要取消收藏的商品
      var index = state.starList.findIndex(function (item) {
        return item == id;
      }); // 将商品id删掉

      state.starList.splice(index, 1);
    }
  },
  actions: {
    // actions里的函数可以处理异步 拿到异步处理后结果 commit给同步方法  
    getHomeList: function getHomeList(_ref2, _ref3) {
      var commit = _ref2.commit;
      var page = _ref3.page,
          pageSize = _ref3.pageSize;

      _https["default"].get('/api/list', {
        params: {
          page: page,
          pageSize: pageSize
        }
      }).then(function (res) {
        commit('setHomeList', res);
      });
    }
  }
};
var _default = home;
exports["default"] = _default;