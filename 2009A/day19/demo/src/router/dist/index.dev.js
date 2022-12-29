"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Index = _interopRequireDefault(require("@/views/Index.vue"));

var _OutLine = _interopRequireDefault(require("@/views/OutLine.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  name: "index",
  component: _Index["default"],
  // 路由重定向 当访问路由路径是根路径时重定向到/home主页
  redirect: '/home',
  // 嵌套路由
  children: [{
    path: "home",
    name: "home",
    meta: {
      title: '主页',
      keepAlive: true,
      position: 0
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/HomeView.vue"));
      });
    }
  }, {
    path: "cart",
    name: "cart",
    meta: {
      title: '购物车'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/ShopCart.vue"));
      });
    }
  }, {
    path: "address",
    name: "address",
    meta: {
      title: '收获地址'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/AddressView.vue"));
      });
    }
  }]
}, {
  path: "/login",
  name: "login",
  meta: {
    title: '登陆'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/views/LoginView.vue"));
    });
  }
}, {
  // 详情页params传参 需要动态设置路由参数
  path: "/detail/:id",
  name: "detail",
  meta: {
    title: '商品详情'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/views/DetailView.vue"));
    });
  }
}, {
  path: '/create/address',
  name: 'createAddress',
  meta: {
    title: '新增地址'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/views/CreateAddress.vue"));
    });
  }
}, {
  path: '/search',
  name: 'search',
  meta: {
    title: '搜索内容'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/views/SearchDetail.vue"));
    });
  }
}, {
  path: '/404',
  name: '404',
  meta: {
    title: '地址错误'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/404.vue'));
    });
  }
}, {
  // 网络不好的页面 不要用路由懒加载
  path: '/outline',
  name: 'outline',
  meta: {
    title: '网络异常'
  },
  component: _OutLine["default"]
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes // scrollBehavior: function (to, from, savedPosition) {
  //   console.log(to,savedPosition)
  //   return savedPosition || { x: 0, y: 0 }
  // }

}); //白名单：哪些路由不被拦截 必须有登陆页 不然登陆自己跳自己 死循环 会超出最大栈堆调用

var WhiteList = ['/login', '/home', '/404']; // 全局路由前置导航守卫

router.beforeEach(function (to, from, next) {
  // console.log(to)
  // 跳转路由不存在 重定向到404页面
  if (!to.matched.length) {
    next('/404');
  } // 假设登陆后会有一个token


  var token = localStorage.token; // 判断 如果没有登陆 并且白名单不包含这个路由地址 拦截到登陆页

  if (!token && !WhiteList.includes(to.path)) {
    // 存储一下被拦截的路径 如果登陆完毕 还要跳转过来
    localStorage.setItem('RouterPath', to.path);
    return next('/login');
  } // 如果逻辑走到这里了 说明至少登陆了 或者 在白名单中 直接放行


  next();
});
var _default = router;
exports["default"] = _default;