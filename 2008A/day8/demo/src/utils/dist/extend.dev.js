"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _FormToast = _interopRequireDefault(require("@/components/FormToast.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入Vue
// 引入 需要动态创建的组件
// 声明一个构造器来编辑组件的实例
var ToastConstructor = _vue["default"].extend(_FormToast["default"]); // 封装一个函数 用来调用组件 函数接收两个参数 第一个参数是现实什么文案 第二个参数是显示多少毫秒后销毁组件


function showToast(title) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  // 实例化构造器
  var dom = new ToastConstructor({
    // 通过document在浏览器中 创建一个元素用于存放动态创建的组件内容
    el: document.createElement('div'),
    data: function data() {
      return {
        title: title,
        showToast: true
      };
    }
  }); // 在浏览器中追加 这个组件 

  document.body.appendChild(dom.$el); // 使用定时器 给一个延迟时间 弹窗现实的时间

  setTimeout(function () {
    dom.showToast = false;
  }, timeout);
}

function mountFn() {
  _vue["default"].prototype.$toast = showToast;
}

var _default = mountFn;
exports["default"] = _default;