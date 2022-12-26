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
  redirect: '/home',
  children: [{
    path: 'home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/HomeView.vue'));
      });
    }
  }, {
    path: 'my',
    name: 'my',
    meta: {
      title: '我的'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/MyView.vue'));
      });
    }
  }, {
    path: 'cart',
    name: 'cart',
    meta: {
      title: '购物车'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/ShopCart.vue'));
      });
    }
  }]
}, {
  path: '/login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/UserLogin.vue'));
    });
  }
}, {
  path: '/qrlogin',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/QrLogin.vue'));
    });
  }
}, {
  path: '/detail/:id',
  name: 'detail',
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
var WhiteList = ['/login', '/home', '/qrlogin']; // 路由全局前置导航守卫

router.beforeEach(function (to, from, next) {
  var logined = localStorage.logined;

  if (!logined && !WhiteList.includes(to.path)) {
    // 存一下被拦截的路由地址
    localStorage.setItem('RouterPath', to.path);
    return next('/login');
  }

  next();
});
var _default = router;
exports["default"] = _default;