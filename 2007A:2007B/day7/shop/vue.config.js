const { defineConfig } = require("@vue/cli-service");
// 1. npm i axios mockjs -D 然后引入mock 模拟数据
const Mock = require('mockjs')

let data = Mock.mock({
  "shopList|10":[
    {
      name:"@cname(2,4)",
      "price|1-999":1,
      count:1,
      isCheck:false,
      id:"@id",
    }
  ]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    onBeforeSetupMiddleware: function ({app}) {
      // 模拟接口 第一个参数 接口请求路径
      app.get('/api/list', function (req, res) {
        // 调用 '/api/list' 时返回什么数据
        res.json(data.shopList)
      });
    },
  },
});
