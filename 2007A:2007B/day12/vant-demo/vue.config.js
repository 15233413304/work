const { defineConfig } = require("@vue/cli-service");
// 引入mockjs 
const Mock = require('mockjs')

// mock数据
let data = Mock.mock({
  "list1|10":[{
    id:'@id',
    name: '@ctitle(3,6)',
    img:'@image(100x100,@color)',
    "price|1-1000":1,
  }],
  "list2|10":[{
    id:'@id',
    name: '@ctitle(3,6)',
    img:'@image(100x100,@color)',
    "price|1000-10000":1,
  }],
  "list3|10":[{
    id:'@id',
    name: '@title(1)',
    img:'@image(100x100,@color)',
    "price|10000-100000":1,
  }],
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let { url } = req.query
        if(url =='/home/tab1'){
          return res.send(data.list1)
        }
        if(url =='/home/tab2'){
          return res.send(data.list2)
        }
        if(url =='/home/tab3'){
          return res.send(data.list3)
        }
      });
      app.get('/api/detail',(req,res)=>{
        let { id,tab } = req.query
        // 根据tab标识判断当前是哪个页面
        if(tab == 1){
          // find 循环搜索符合条件的项 返回值：符合条件的那一项
          return res.send(data.list1.find(item=> item.id == id))
        }
        if(tab == 2){
          return res.send(data.list2.find(item=> item.id == id))
        }
        if(tab == 3){
          return res.send(data.list3.find(item=> item.id == id))
        }
      })
    }
  }
});
