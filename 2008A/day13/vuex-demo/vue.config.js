const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "list|40":[
    {
      id:"@id",
      name:"@ctitle(2,10)",
      "price|1-199":0,
      img:"@image(100x70,@color)"
    }
  ]
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
