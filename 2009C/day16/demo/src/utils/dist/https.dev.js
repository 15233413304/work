"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _index = _interopRequireDefault(require("@/router/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var instanc = _axios["default"].create();

instanc.defaults.timeout = 2500; // 添加请求拦截器

_axios["default"].interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.token; // 在请求头中携带token 判断是否存在token 并且token没过期

  if (token && token > +new Date() - 3600 * 1000) {
    config.headers.Authorization = token;
  } else {
    //如果不存在 或者过期了 那就跳转到登陆页
    // 如果存在token 只是过期了 就先删掉token
    token && localStorage.removeItem('token');

    _index["default"].push('/login');
  } // console.log(config)


  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); // 添加响应拦截器


_axios["default"].interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

var _default = _axios["default"];
exports["default"] = _default;