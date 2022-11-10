const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const data = Mock.mock({
  "list|100":[{
    img:"@image(100x100,@color)",
    title:'@ctitle(2,6)',
    "price|9-100.1":0,
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
