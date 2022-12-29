const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const data = Mock.mock({
  "list|200":[{
    id:"@id",
    name:'@ctitle(4,10)',
    desc:'@title(4,8)',
    "price|100-200":1,
    img:'@image(100x100,@color)',
    "banner|5":["@image(375x150,@color)"]
  }]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let { page, pageSize } = req.query
        // 拷贝一份源数据 然后根据页码和每页条数截取
        let list = [...data.list].slice(0,page*pageSize)
        // 总数据条数
        let total = data.list.length
        res.json({list,total})
      })
    }
  }
});
