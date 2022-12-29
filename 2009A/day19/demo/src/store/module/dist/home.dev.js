"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("@/utils/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var home = {
  // 命名空间 防止与其他vuex业务模块因同一个命名引起的冲突
  namespaced: true,
  state: {
    // 主页列表
    homeList: [],
    // 总数据条数
    total: 0,
    // 收藏的商品列表
    starList: [],
    // 搜索商品的历史记录列表
    historyList: []
  },
  getters: {},
  mutations: {
    // 拿到异步处理后返回的数据 通过同步的函数对state进行赋值
    setHomeList: function setHomeList(state, _ref) {
      var list = _ref.list,
          total = _ref.total;
      state.homeList = list;
      state.total = total;
    },
    setOnStar: function setOnStar(state, id) {
      // 直接添加到收藏列表
      state.starList.push(id);
    },
    setOffStar: function setOffStar(state, id) {
      // 从收藏列表中找到要取消收藏的商品id下标
      var index = state.starList.findIndex(function (item) {
        return item == id;
      }); // 将该商品id删掉

      state.starList.splice(index, 1);
    },
    // 新增搜索历史记录
    createHistory: function createHistory(state, value) {
      // 先搜索一下历史记录列表中是否有这个搜索内容
      var index = state.historyList.findIndex(function (item) {
        return item == value;
      });

      if (index == -1) {
        // 没有这个内容 则添加到历史记录中
        state.historyList.push(value);
      }
    },
    // 删除搜索历史记录
    delHistory: function delHistory(state, index) {
      state.historyList.splice(index, 1);
    }
  },
  actions: {
    getList: function getList(_ref2, _ref3) {
      var commit = _ref2.commit;
      var page = _ref3.page,
          pageSize = _ref3.pageSize;

      // 通过actions里的函数 处理好异步操作后 返回的结果通知给同步函数
      _http["default"].get('/api/list', {
        params: {
          page: page,
          pageSize: pageSize
        }
      }).then(function (res) {
        commit('setHomeList', res);
      });
    }
  }
}; // 一定要记得抛出模块

var _default = home;
exports["default"] = _default;