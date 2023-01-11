"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _http = _interopRequireDefault(require("@/utils/http"));

var _elementUi = require("element-ui");

var _vuePersistedstate = require("vue-persistedstate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);
/**
 * @name: createVuexPersistedState
 * @param {key:string}
 * @param {storage}
 * @param {whiteList:Array<string>}
 * @param {blackList:Array<string>}
 * @return {storage}
 */


var _default = new _vuex["default"].Store({
  plugins: [(0, _vuePersistedstate.createVuexPersistedState)({
    key: 'vuex',
    storage: sessionStorage
  })],
  state: {
    tableList: [],
    total: 0,
    // 权限码
    PermissionStatus: -1,
    userName: ''
  },
  getters: {},
  mutations: {
    // 对state里的 列表数据 和 总数据条数 进行赋值
    setTableList: function setTableList(state, _ref) {
      var list = _ref.list,
          total = _ref.total;
      state.tableList = list;
      state.total = total;
    },
    setPermission: function setPermission(state, _ref2) {
      var success = _ref2.success,
          PermissionStatus = _ref2.PermissionStatus,
          userName = _ref2.userName;

      // 弹出一个成功的提示
      _elementUi.Message.success(success); // 权限码


      state.PermissionStatus = PermissionStatus; // 当前登陆的用户名

      state.userName = userName;
    }
  },
  actions: {
    // 获取表格数据
    getTableList: function getTableList(_ref3, _ref4) {
      var commit = _ref3.commit;
      var page = _ref4.page,
          pageSize = _ref4.pageSize;

      _http["default"].get('/api/list', {
        params: {
          page: page,
          pageSize: pageSize
        }
      }).then(function (res) {
        commit('setTableList', res);
      });
    },
    userLogin: function userLogin(_ref5, _ref6) {
      var commit = _ref5.commit;
      var userName = _ref6.userName,
          password = _ref6.password;

      _http["default"].get('/api/login', {
        params: {
          userName: userName,
          password: password
        }
      }).then(function (res) {
        if (res.error) {
          return _elementUi.Message.error(res.error);
        } // 存一个token状态


        localStorage.setItem('token', +new Date());
        commit('setPermission', res);
      });
    }
  },
  modules: {}
});

exports["default"] = _default;