const { defineConfig } = require("@vue/cli-service");

const Mock = require('mockjs')

const data = Mock.mock({
  "list|100":[
    {
      img:'@image(100x100,@color)',
      name:'@ctitle(4,10)',
      'price|100-200':1,
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
        // 拷贝一份列表 因为要slice 会操作原数组
        let list = [...data.list]
        // 上拉加载时 数据会越拉越多 所以要从下标0开始截取
        res.send({list: list.slice(0,page * pageSize),total: data.list.length})
      })
    }
  }
});
