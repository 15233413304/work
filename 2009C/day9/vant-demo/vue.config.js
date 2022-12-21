const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "list|100":[
    {
      img:"@image(100x100,@color)",
      name:'@ctitle(2,10)',
      "price|100-200":1,
      id:'@id'
    }
  ]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let { page,pageSize } = req.query
        let list = [...data.list]
        // 注意： 这里的分页和pc端不太一样 数据是越加载越多 
        res.send({list:list.slice(0,page*pageSize),total:data.list.length})
      })
    }
  }
});
