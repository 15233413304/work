const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

let data = Mock.mock({
  "list|60":[{
    id:'@id',
    img:'@image(100x100,@color)',
    title:'@ctitle(3,5)',
    content: "@ctitle(20,30)",
    "price|100-10000.2":1,
    isCheck:false,
  }]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      // 获取列表
      app.get('/api/list',(req,res)=>{
        let { page } = req.query
        // 返回 
        res.send(data.list.slice(0, page * 10))
      });
    }
  }
});