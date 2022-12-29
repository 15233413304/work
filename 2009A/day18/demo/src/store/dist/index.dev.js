"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _home = _interopRequireDefault(require("@/store/module/home"));

var _cart = _interopRequireDefault(require("@/store/module/cart"));

var _address = _interopRequireDefault(require("@/store/module/address"));

var _vuePersistedstate = require("vue-persistedstate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入vuex模块
// 引入数据持久化插件
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
    // 使用vuex的模块
    home: _home["default"],
    cart: _cart["default"],
    address: _address["default"]
  }
});

exports["default"] = _default;