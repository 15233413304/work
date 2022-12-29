"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Index = _interopRequireDefault(require("../views/Index.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  name: "index",
  component: _Index["default"],
  // 路由重定向 当访问路径是跟路径时 重定向到主页
  redirect: '/home',
  // 嵌套路由
  children: [{
    path: 'home',
    name: 'home',
    meta: {
      title: '主页'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/HomeView.vue"));
      });
    }
  }, {
    path: 'shop',
    name: 'shop',
    meta: {
      title: '购物车'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/ShopCart.vue"));
      });
    }
  }, {
    path: 'address',
    name: 'address',
    meta: {
      title: '收货地址'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/AddressView.vue"));
      });
    }
  }]
}, {
  path: '/login',
  name: 'login',
  meta: {
    title: "登陆页"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/LoginView.vue'));
    });
  }
}, {
  path: '/detail/:id',
  name: 'detail',
  meta: {
    title: "商品详情"
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/DetailView.vue'));
    });
  }
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
var WhiteList = ['/login', '/home']; // 全局路由前置守卫

router.beforeEach(function (to, from, next) {
  var token = localStorage.token; // 判断 如果没有登陆 并且 不在白名单内 拦截到登陆页

  if (!token && !WhiteList.includes(to.path)) {
    // 存储一下被拦截的路由地址
    localStorage.setItem('RouterPath', to.path);
    return next('/login');
  } // 登陆了 或者是白名单内的路由 直接放行


  next();
});
var _default = router;
exports["default"] = _default;