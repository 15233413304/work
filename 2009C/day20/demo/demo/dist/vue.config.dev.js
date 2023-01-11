"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require("@vue/cli-service"),
    defineConfig = _require.defineConfig;

var Mock = require('mockjs');

var data = Mock.mock({
  "list|200": [{
    id: "@id",
    name: '@ctitle(4,10)',
    desc: '@title(4,8)',
    "price|100-200": 1,
    img: '@image(100x100,@color)',
    "banner|5": ["@image(375x150,@color)"]
  }]
});
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    onBeforeSetupMiddleware: function onBeforeSetupMiddleware(_ref) {
      var app = _ref.app;
      app.get('/api/list', function (req, res) {
        var _req$query = req.query,
            page = _req$query.page,
            pageSize = _req$query.pageSize; // 拷贝一份源数据 然后根据页码和每页条数截取

        var list = _toConsumableArray(data.list).slice(0, page * pageSize); // 总数据条数


        var total = data.list.length;
        res.json({
          list: list,
          total: total
        });
      });
    }
  }
});