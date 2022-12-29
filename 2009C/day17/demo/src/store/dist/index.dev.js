"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _home = _interopRequireDefault(require("@/store/module/home"));

var _shop = _interopRequireDefault(require("@/store/module/shop"));

var _address = _interopRequireDefault(require("@/store/module/address"));

var _vuePersistedstate = require("vue-persistedstate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入vuex模块文件
// 主页列表相关逻辑
// 购物车相关逻辑
_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  plugins: [(0, _vuePersistedstate.createVuexPersistedState)({
    key: 'vuex',
    storage: localStorage
  })],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // 使用模块
    home: _home["default"],
    shop: _shop["default"],
    address: _address["default"]
  }
});

exports["default"] = _default;