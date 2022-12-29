"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("@/router/index"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.timeout = 3000;

_axios["default"].interceptors.request.use(function (config) {
  // 请求拦截器
  return config;
}, function (error) {
  return Promise.reject(error);
});

_axios["default"].interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 判断客户端网络是否正常
  if (!window.navigator.onLine || error && error.code == "ERR_NETWORK") {
    // 存一下没网络时的路由路径
    localStorage.setItem('onlineRouter'); // 跳转到无网络的页面

    _index["default"].push('/outline');

    return _vant.Toast.fail('网络错误,请检查设备网络是否正常');
  }

  return Promise.reject(error);
});

var _default = _axios["default"];
exports["default"] = _default;