const { defineConfig } = require("@vue/cli-service");
// 引入mock
const Mock = require('mockjs')
// mock模拟数据
let data = Mock.mock({
  "banner|4":["@image(300x100,@color)"],
  "tabList1|20":[{
    id:'@id',
    name:'@ctitle(3,6)',
    "price|10-100.2":1,
    img:'@image(100x100,@color)',
    "detailImg|10": ['@image(375x200,@color)'],
    pinglun:[],
  }],
  "tabList2|20":[{
    id:'@id',
    name:'@ctitle(3,6)',
    "price|10000-100000.2":1,
    img:'@image(100x100,@color)',
    "detailImg|10": ['@image(375x200,@color)'],
    pinglun:[],
  }],
  "tabList3|20":[{
    id:'@id',
    name:'@title(1,3)',
    "price|100000-1000000.2":1,
    img:'@image(100x100,@color)',
    "detailImg|10": ['@image(375x200,@color)'],
    pinglun:[],
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
      });
      // 添加评论
      app.get('/api/talk',(req,res)=>{
        let {id,tab, talk} = req.query
        if(tab == 0){
          data.tabList1.forEach(item=>{
            if(item.id == id){
              item.pinglun.unshift(talk)
              return res.send(item)
            }
          })
        }
        if(tab == 1){
          data.tabList2.forEach(item=>{
            if(item.id == id){
              item.pinglun.unshift(talk)
              return res.send(item)
            }
          })
        }
        if(tab == 2){
          data.tabList3.forEach(item=>{
            if(item.id == id){
              item.pinglun.unshift(talk)
              return res.send(item)
            }
          })
        }
      });
      // 删除评论
      app.get('/api/deltalk',(req,res)=>{
        let { id,tab,index} = req.query
        if(tab == 0){
          data.tabList1.forEach(item=>{
            if(item.id == id){
              item.pinglun.splice(index, 1)
              return res.send(item)
            }
          })
        }
        if(tab == 1){
          data.tabList2.forEach(item=>{
            if(item.id == id){
              item.pinglun.splice(index, 1)
              return res.send(item)
            }
          })
        }
        if(tab == 2){
          data.tabList3.forEach(item=>{
            if(item.id == id){
              item.pinglun.splice(index, 1)
              return res.send(item)
            }
          })
        }
      })
    }
  }
});
