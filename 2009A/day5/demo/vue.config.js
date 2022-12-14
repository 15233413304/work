const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const BannerList = Mock.mock({
  "list|10":['@image(400x200,@color)']
})
// 注意：！！！改vue.config.js里的代码时 必须重启服务才会生效
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    // 定义一个本地的接口 当axios调用这些接口时 返回需要返回的数据
    onBeforeSetupMiddleware({app}){
      app.get('/api/list', (req, res)=>{
        res.send(BannerList.list)
      })
    }
  }
});