const { defineConfig } = require("@vue/cli-service");
// 引入mock
const Mock = require('mockjs')
// mock模拟数据
let data = Mock.mock({
  "banner|4":["@image(300x100,@color)"],
  "tabList1|20":[{
    id:'@id',
    name:'@ctitle',
    "price|10-100":1,
    img:'@image(100x100,@color)',
    "detailImg|10": ['@image(375x200,@color)'],
  }],
  "tabList2|20":[{
    id:'@id',
    name:'@ctitle',
    "price|10-100":1,
    img:'@image(100x100,@color)',
    "detailImg|10": ['@image(375x200,@color)'],
  }],
  "tabList3|20":[{
    id:'@id',
    name:'@ctitle',
    "price|10-100":1,
    img:'@image(100x100,@color)',
    "detailImg|10": ['@image(375x200,@color)'],
  }]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      // 获取列表
      app.get('/api/list',(req,res)=>{
        res.send(data)
      });
      // 详情页数据
      app.get('/api/detail',(req,res)=>{
        let { id, tab } = req.query
        // filter 返回
        // [{
        //   id:'@id',
        //   name:'@ctitle',
        //   "price|10-100":1,
        //   img:'@image(100x100,@color)'
        // }]
        // find 返回
        // {
        //   id:'@id',
        //   name:'@ctitle',
        //   "price|10-100":1,
        //   img:'@image(100x100,@color)'
        // }
        // 筛选出点击的商品 并返回该商品
        if(tab == 0){
          return res.send(data.tabList1.find(item=> item.id==id))
        }
        if(tab == 1){
          return res.send(data.tabList2.find(item=> item.id==id))
        }
        if(tab == 2){
          return res.send(data.tabList3.find(item=> item.id==id))
        }
      })
    }
  }
});
