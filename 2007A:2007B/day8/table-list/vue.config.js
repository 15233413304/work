const { defineConfig } = require("@vue/cli-service");
// 从mockjs包里引入Mock
const Mock = require('mockjs')

// 模拟数据
let data = Mock.mock({
  "list|20":[
    {
      name:"@name(9,12)",
      disc:"@ctitle(8,10)",
      "count|5000000-10000000":1,
      time: +new Date()
    }
  ]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 获取列表
    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.get('/api/list', function (req, res) {
        // 当axios调用 get('/api/list') 的时候 将mock数据发送过去
        res.json(data.list);
      });
      // 新增数据
      devServer.app.get('/api/add', function (req, res) {
        // 当axios调用 get('/api/add') 的时候 将mock数据发送过去
        const { form } = req.query
        // 在数组前边添加一条数据 unshift会修改原数组 并返回修改后数组的length
        data.list.unshift(form)
      });
    },
  },
});
