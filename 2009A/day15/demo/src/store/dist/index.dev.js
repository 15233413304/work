"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _http = _interopRequireDefault(require("@/utils/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    homeList: [],
    detailData: {}
  },
  getters: {},
  mutations: {
    setList: function setList(state, res) {
      state.homeList = res;
    },
    setDetail: function setDetail(state, res) {
      state.detailData = res;
    },
    setTalk: function setTalk(state, talk) {
      // 判断有没有讨论列表
      if (state.detailData.talk) {
        // 如果有 直接unshift
        return state.detailData.talk.unshift(talk);
      } // 没有talk列表 首先创建一个空数组
      // 向数组中追加内容
      // vue监听不到 新增的数组 可以通过 set方法来响应式的设置一个新的值
      // 在.vue组件中 可以使用 this.$set(要给什么响应式设置值, 你要设置的响应式值的名字, 这个值的内容)
      // 在js文件中 Vue.set(要给什么响应式设置值, 你要设置的响应式值的名字, 这个值的内容)


      _vue["default"].set(state.detailData, 'talk', [talk]); // state.detailData.talk = []
      // state.detailData.talk.push(talk)

    }
  },
  actions: {
    // 页面中 通过 this.$sotore.dispatch('getList',参数) 就可以执行这个函数
    getList: function getList(_ref, tab) {
      var commit = _ref.commit;

      _http["default"].get('/api/list', {
        params: {
          tab: tab
        }
      }).then(function (res) {
        commit('setList', res);
      });
    },
    getDetail: function getDetail(_ref2, _ref3) {
      var commit = _ref2.commit;
      var tab = _ref3.tab,
          id = _ref3.id;

      _http["default"].get('/api/detail', {
        params: {
          tab: tab,
          id: id
        }
      }).then(function (res) {
        commit('setDetail', res);
      });
    }
  },
  modules: {}
});

exports["default"] = _default;