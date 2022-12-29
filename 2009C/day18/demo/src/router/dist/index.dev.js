"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Index = _interopRequireDefault(require("../views/Index.vue"));

var _OutLine = _interopRequireDefault(require("../views/OutLine.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  name: "index",
  component: _Index["default"],
  // 路由重定向
  redirect: '/home',
  // 子路由 嵌套路由
  children: [{
    path: 'home',
    name: 'home',
    // 路由元信息
    meta: {
      title: '主页'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/HomeView.vue'));
      });
    }
  }, {
    path: 'my',
    name: 'my',
    // 路由元信息
    meta: {
      title: '个人'
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
      title: '购物'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/ShopCart.vue'));
      });
    }
  }, {
    path: 'address',
    name: 'address',
    meta: {
      title: '地址'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/addressView.vue'));
      });
    }
  }]
}, {
  //网络错误页面 不使用懒加载
  path: '/outline',
  name: 'outline',
  component: _OutLine["default"]
}, {
  //404页面
  path: '/404',
  name: '404',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/404View.vue'));
    });
  }
}, {
  //登陆页
  path: '/login',
  name: 'login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/LoginView.vue'));
    });
  }
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
}); // 配置一个路由白名单 这些路由不会被拦截

var WhiteList = ['/home', '/login', '/outline', '/404']; // 全局路由前置导航守卫

router.beforeEach(function (to, from, next) {
  var token = localStorage.token; // 判断跳转的地址是否存在

  if (!to.matched.length) {
    // 如果路由的规则不存在 那么说明路由地址错误
    next('/404');
  }

  if (!token && !WhiteList.includes(to.path)) {
    localStorage.setItem('RouterPath', to.path);
    next('/login');
  }

  next();
});
var _default = router;
exports["default"] = _default;