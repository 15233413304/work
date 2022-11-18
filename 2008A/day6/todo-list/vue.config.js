const { defineConfig } = require("@vue/cli-service");
// 引入mockjs
const Mock = require('mockjs') 

const data = Mock.mock({
  "list|10":[
    {
      title: "@ctitle(4,8)",
      isDo: true
    }
  ]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    open:true,
    hot:true,
    host:"localhost",
    port:'1388',
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        res.json(data.list);
      })
    }
  }
});