const { defineConfig } = require("@vue/cli-service");
// 引入Mock方法
const Mock = require('mockjs')
// 模拟数据
const data = Mock.mock({
  "list|10":[{
    // 商品图
    img:"@image(50x50,@color)",
    // 商品名称
    name: '@ctitle(4,7)',
    // 商品价格
    "price|10-90":1,
    // 商品数量
    count: 1,
    // 是否选中该商品
    isCheck:false,
    // 商品id
    id:"@id",
  }]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    host:'localhost',
    port:'8000',
    open: true,
    onBeforeSetupMiddleware({app}){
      app.get('/api/shop',(req,res)=>{
        res.send(data.list)
      })
    }
  }
});
