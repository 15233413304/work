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
  // 判断当前设备是否无网络 网络不好时 弹出友好提示
  if (window.navigator.onLine) {
    // console.log(Router,'router')
    // 无网络时将当前页面存到本地存储中 以便有网络时返回
    localStorage.setItem('online', _index["default"].currentRoute.path);

    _index["default"].replace('/outline');

    return _vant.Toast.fail('网络错误，请检查网络');
  } //错误码判断


  if (error) {
    console.log(error);
  }

  return Promise.reject(error);
});

var _default = _axios["default"];
exports["default"] = _default;