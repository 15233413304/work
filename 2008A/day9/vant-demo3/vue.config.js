const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
// 引入mockjs
const Mock = require('mockjs')

// 模拟数据
const data = Mock.mock({
  "list|20":[
    {
      // list列表里有20条数据 每条数据里有个商品名 goods: 2-6个中文
      goods:'@ctitle(2,6)',
      // 每条数据里有个商品价格 price: 10到100 数字
      "price|10-100":0,
      // 每条数据里有个商品id id:独一无二的值
      id: "@id",
      url: "@image(100x100,@color)"
    }
  ]
})


module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        res.json(data.list)
      })
    }
  }
});
