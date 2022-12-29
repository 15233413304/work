"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var address = {
  namespaced: true,
  state: {
    list: [// {
      //     id: '1',
      //     name: '张三',
      //     tel: '13000000000',
      //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
      //     isDefault: true,
      // },
      // {
      //     id: '2',
      //     name: '李四',
      //     tel: '1310000000',
      //     address: '浙江省杭州市拱墅区莫干山路 50 号',
      // },
    ]
  },
  getters: {},
  mutations: {
    // 新建地址
    createAddress: function createAddress(state, data) {
      // 判断一下是否是默认地址
      if (data.isDefault) {
        // 如果是默认地址 首先 先把列表中所有的isDefault 变成false
        state.list.forEach(function (item) {
          item.isDefault = false;
        }); // 将这个地址从数组的头部追加

        return state.list.unshift(_objectSpread({}, data));
      } // 不是默认地址是 直接添加即可


      state.list.push(_objectSpread({}, data));
    },
    // 编辑地址
    editAddress: function editAddress(state, data) {
      var index = state.list.findIndex(function (item) {
        return item.id == data.id;
      }); // 编辑地址 也需要判断是否为默认地址

      if (data.isDefault) {
        // 如果为默认地址 首先 先把列表中所有的isDefault 变成false
        state.list.forEach(function (item) {
          item.isDefault = false;
        }); // 先删掉原来位置的地址信息

        state.list.splice(index, 1); // 将这个地址从数组的头部追加

        state.list.unshift(_objectSpread({}, data));
        return;
      } // 没设置为默认地址 那就直接替换
      // state.list[index] = {...data}


      state.list.splice(index, 1, _objectSpread({}, data));
    },
    // 删除地址
    delAddress: function delAddress(state, id) {
      var index = state.list.findIndex(function (item) {
        return item.id == id;
      });
      state.list.splice(index, 1);
    }
  },
  actions: {}
};
var _default = address;
exports["default"] = _default;