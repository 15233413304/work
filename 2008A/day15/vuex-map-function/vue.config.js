const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const data = Mock.mock({
  "list|10":[{
    name:'@cname(2,4)',
    "age|10-100":0,
    avatar:'@image(100x100,@color)'
  }]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        res.send(data.list)
      })
    }
  }
});
