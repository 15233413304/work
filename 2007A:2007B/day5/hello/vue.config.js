const { defineConfig } = require("@vue/cli-service");
// 引入mock     npm i mockjs -D
const Mock = require('mockjs')

// mock数据
let data = Mock.mock({
  "list|10":[
    {
      title: '@ctitle(2,5)',
      "price|1-100": 100,
      count:1,
      id:'@id'
    }
  ]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 每次修改vue.config.js时都要重新启动服务 npm run serve
  devServer:{
    // 启动服务时打开浏览器
    open: true,
    // 设置域名
    host:'localhost',
    // 设置端口号
    port: '1388',
    // 热重载
    hot: true,
    onBeforeSetupMiddleware({app}){
      app.get('/list',(req,res)=>{
        res.send(data.list)
      })
    }
  }
});
