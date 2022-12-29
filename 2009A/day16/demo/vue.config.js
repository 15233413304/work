const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "list|200":[{
    id:'@id',
    name:'@ctitle(6,10)',
    desc:'@title(6,10)',
    img:"@image(100x100,@color)",
    "price|100-200":1,
    "banner|5":['@image(375x150,@color)']
  }]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let { page,pageSize } = req.query
        // 拷贝一份源数据
        let list = [...data.list]
        // 返回一个根据 从0开始截取到 页码*每页条数 的数据列表 和 总数据条数
        res.json({list: list.slice(0,page*pageSize), total: data.list.length})
      })
    }
  }
});
