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
  mutations: {
    // 新增收货地址
    createAddress: function createAddress(state, data) {
      // 判断有没有设置为默认地址
      if (data.isDefault) {
        // 如果新增的地址设置为默认地址了 将列表中其他地址都取消默认
        state.list.forEach(function (item) {
          item.isDefault = false;
        }); // 在数组的头部追加一条数据

        state.list.unshift(_objectSpread({}, data));
        return;
      } // 没设置为默认地址直追加


      state.list.push(_objectSpread({}, data));
    },
    editAddress: function editAddress(state, data) {
      var index = state.list.findIndex(function (item) {
        return item.id == data.id;
      }); // 判断有没有设置为默认地址

      if (data.isDefault) {
        // 如果新增的地址设置为默认地址了 将列表中其他地址都取消默认
        state.list.forEach(function (item) {
          item.isDefault = false;
        }); // 在数组的头部追加一条数据

        state.list.splice(index, 1);
        state.list.unshift(_objectSpread({}, data));
        return;
      } // 没设置为默认地址 直接替换


      state.list.splice(index, 1, _objectSpread({}, data));
    },
    delAddress: function delAddress(state, id) {
      var index = state.list.findIndex(function (item) {
        return item.id == id;
      });
      state.list.splice(index, 1);
    }
  }
};
var _default = address;
exports["default"] = _default;