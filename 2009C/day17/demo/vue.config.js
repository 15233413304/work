const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "list|200":[{
    id:'@id',
    name:'@ctitle(5,10)',
    "price|100-200":1,
    img:'@image(100x100,@color)',
    "banner|5":['@image(375x150,@color)'],
    desc:'@title(5,10)',
  }]
})


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let { page, pageSize } = req.query
        let list = [...data.list].slice(0,page*pageSize)
        res.json({list,total:data.list.length})
      })
    }
  }
});
