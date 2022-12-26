const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const data = Mock.mock({
  "list|40":[{
    id:'@id',
    name:'@ctitle(2,10)',
    "price|100-200":1,
    img:"@image(100x100,@color)"
  }]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        res.json(data.list)
      })
    }
  }
});
