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
    homeList: []
  },
  getters: {},
  mutations: {
    setList: function setList(state, res) {
      state.homeList = res;
    }
  },
  actions: {
    getList: function getList(_ref) {
      var commit = _ref.commit;

      _http["default"].get('/api/list').then(function (res) {
        commit('setList', res);
      });
    }
  },
  modules: {}
});

exports["default"] = _default;