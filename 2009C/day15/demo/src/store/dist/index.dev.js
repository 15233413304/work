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
    setList: function setList(state, payload) {
      // 这个payload 就是传过来的res 它是一个形参 名字可以自定义
      state.homeList = payload;
    },
    setDetail: function setDetail(state, payload) {
      state.detailData = payload;
    },
    setTalk: function setTalk(state, talk) {
      // 判断 这个详情页的商品内 有没有评论
      if (state.detailData.talkList) {
        // 有评论列表的 新增的评论 追加到列表的顶部 unshift
        return state.detailData.talkList.unshift(talk);
      } // 没有评论列表
      // 因为vue 无法监听到新增的数组这种操作 所以需要使用set方法动态创建一个数组
      // 在.vue组件中 我们可以使用 this.$set(你要设置的数组或对象在什么地方,'属性值的键名',设置值)
      // 在.js 文件中 引入Vue后 使用 Vue.set()
      // 在state.detailData中 动态创建一个名为 talkList 的属性 属性的值为 [talk]


      _vue["default"].set(state.detailData, 'talkList', [talk]);
    }
  },
  actions: {
    // 在.vue组件中 使用 this.$store.dispatch('getList',参数) 就可以调用这个函数
    getList: function getList(_ref, tab) {
      var commit = _ref.commit;

      // context.commit('需要触发的Mutation函数')
      _http["default"].get('/api/list', {
        params: {
          tab: tab
        }
      }).then(function (res) {
        // acitons里的函数处理完异步操作后 还需要通知mutataions里的函数来改变state
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