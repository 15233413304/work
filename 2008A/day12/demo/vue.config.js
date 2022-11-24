const { defineConfig } = require("@vue/cli-service");

const Mock = require('mockjs')

const data = Mock.mock({
  "list|400":[{
    id:"@id",
    name:'@ctitle(2,4)',
    "price|20-100":1,
    img: "@image(50x50,@color)"
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
