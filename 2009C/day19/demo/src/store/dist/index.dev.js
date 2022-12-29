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

// 引入数据持久化插件
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
    starList: []
  },
  getters: {},
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