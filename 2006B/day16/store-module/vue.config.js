const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const list = Mock.mock({
  type:['a','b','c','d'],
  "list|10":[{
    image:"@image(100x100,@color)",
    name:'@ctitle(2,4)',
    "price|9-100.1": 0,
    id: '@id'
  }]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        console.log(req)
        res.send(list)
      })
    }
  }
});