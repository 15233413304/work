const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "tab1|100":[
    {
      title:'@ctitle(2,4)',
      contnet:'@ctitle(20,30)',
      "price|20-100":0,
      img: "@image(100x100,@color)",
      id:'@id'
    }
  ],
  "tab2|80":[
    {
      title:'@ctitle(2,4)',
      contnet:'@ctitle(20,30)',
      "price|20-100":0,
      img: "@image(100x100,@color)",
      id:'@id'
    }
  ],
  "tab3|70":[
    {
      title:'@ctitle(2,4)',
      contnet:'@ctitle(20,30)',
      "price|20-100":0,
      img: "@image(100x100,@color)",
      id:'@id'
    }
  ],
  "tab4|90":[
    {
      title:'@ctitle(2,4)',
      contnet:'@ctitle(20,30)',
      "price|20-100":0,
      img: "@image(100x100,@color)",
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
        // tabIndex tab切换使用多个分类 根据不同的下标展示不同的数据
        // page 当前第几页 
        // pageSize 每页显示多少条数据
        let { tabIndex, page, pageSize} = req.query
        if(tabIndex == 0){
          // total一共有多少条数据
          return res.send({ list: data.tab1.slice(0,page*pageSize), total: data.tab1.length, tab:'每日'})
        }
        if(tabIndex == 1){
          return res.send({ list: data.tab2.slice(0,page*pageSize), total: data.tab2.length, tab:'每周'})
        }
        if(tabIndex == 2){
          return res.send({ list: data.tab3.slice(0,page*pageSize), total: data.tab3.length,tab:'每月'})
        }
        if(tabIndex == 3){
          return res.send({ list: data.tab4.slice(0,page*pageSize), total: data.tab4.length,tab:'每年'})
        }
      })
    }
  }
});
