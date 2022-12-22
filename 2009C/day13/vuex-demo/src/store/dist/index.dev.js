"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  // 状态管理仓库 相当于全局的data 可以存放数据 任何组件都可以访问到
  // 在组件中如何使用？ this.$store.state
  state: {
    count: 1
  },
  // 计算属性 相当于全局的computed 这里定义的计算属性会接收一个默认参数 state
  // 在组件中如何使用？ this,.$store.getters
  getters: {
    newCount: function newCount(state) {
      return state.count + '个';
    }
  },
  // vuex中 同步的方法存在这里 这里定义的函数有两个参数 
  // 第一个参数是 state 第二个参数是接收传过来的值(形参)
  // mutations里的函数 是唯一被允许改变vuex state里的值的方式
  // 在组件中如何使用？ this.$store.commit('事件名', 传值)
  mutations: {
    addCount: function addCount(state, num) {
      state.count += num;
    },
    curCount: function curCount(state, num) {
      state.count -= num;
    },
    setCount: function setCount(state, num) {
      state.count = num;
    }
  },
  // vuex中 异步的方法存在这里 这里定义的函数有两个参数
  // 第一个参数是 上下文 类似于this 上下文指的是store这个类
  // 第二个参数是传过来的值
  // 在组件中如何使用？ this.$store.dispatch('事件名',传值)
  actions: {
    getCount: function getCount(ctx) {
      var res;
      return regeneratorRuntime.async(function getCount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get('/api/count'));

            case 2:
              res = _context.sent;
              // console.log(res,'res_____',ctx,'ctx___________')
              ctx.commit('setCount', res.data);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  // 模块化vuex 可以根据不同需求、功能拆分出多个模块单独管理
  modules: {}
});

exports["default"] = _default;