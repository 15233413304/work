"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _vant = require("vant");

var _index = _interopRequireDefault(require("@/router/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = _axios["default"].create(); // 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒


instance.defaults.timeout = 2500; // 添加请求拦截器

_axios["default"].interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.token;
  token && (config.headers.Authorization = token);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); // 添加响应拦截器


_axios["default"].interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // console.log(error)
  // 判断客户端是否有网络 无网络时 弹出提示
  if (!window.navigator.onLine || error && error.code == "ERR_NETWORK") {
    localStorage.setItem('onlineRouter', _index["default"].currentRoute.path);

    _index["default"].push('/outline');

    return _vant.Toast.fail('网络错误,请检查网络');
  } // 对响应错误做点什么


  if (error && error.message.includes('404')) {
    return _vant.Toast.fail('请求路径错误,请联系开发人员');
  }

  if (error && error.message.includes('500')) {
    return _vant.Toast.fail('服务器错误,请联系开发人员');
  }

  return Promise.reject(error);
});

var _default = _axios["default"];
exports["default"] = _default;