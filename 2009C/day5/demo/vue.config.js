const { defineConfig } = require("@vue/cli-service");
// npm i mockjs axios -D
// 引入mock
const Mock = require('mockjs')
// 使用Mock.mock()模拟数据

const banner = Mock.mock({
  // list:['十个500宽200高随机颜色的图片']
  "list|10":["@image(500x200,@color)"]
})

// 注意！ 改变vue.config.js中配置时需要重启服务才会生效

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // webpack 官网写法
  // devServer: {
  //   onBeforeSetupMiddleware(devServer) {
  //     devServer.app.get('/api/banner', function (req, res) {
  //       res.json(banner.list);
  //     });
  //   },
  // },
  devServer:{
    onBeforeSetupMiddleware({app}){
       // 模拟/定义一个接口
       app.get('/api/banner',(req, res)=>{
        res.send(banner.list)
       });
    }
  }
})