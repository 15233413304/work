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
  // console.log(config)
  var token = localStorage.token;

  if (token && token > +new Date() - 3600 * 1000) {
    //有token 并且没有过期 请求头携带token
    config.headers.Authorization = token;
  } else {
    _vant.Toast.fail('用户信息已过期，请重新登陆'); // 如果token过期了 或者没有token 先清理token（已过期）


    localStorage.removeItem('token'); //重新登陆

    _index["default"].push('/login');
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

_axios["default"].interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

var _default = _axios["default"];
exports["default"] = _default;