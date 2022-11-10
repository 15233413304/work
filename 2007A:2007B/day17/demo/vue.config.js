const { defineConfig } = require("@vue/cli-service");
// 引入mock
const Mock = require('mockjs')

// mock数据
let data = Mock.mock({
  "homeList|100":[
    {
      title:"@ctitle(2,5)",
      url: "@image(100x100,@color)",
      "price|1-100.2":1 
    }
  ]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      // 获取主页列表
      app.get('/api/list',(req,res)=>{
        let { page, pageSize } = req.query
        let newList = data.homeList
        res.send({homeList:newList.slice(0,page*pageSize),total:data.homeList.length})
      })
    }
  }
});
