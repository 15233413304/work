const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const data = Mock.mock({
  "list|100":[{
    img:"@image(100x100,@color)",
    title:'@ctitle(2,6)',
    "price|9-100.1":0,
    id:'@id',
  }],
  names: [
    { user: "admin", pwd: "123456", permission: "1" },
    { user: "admin2", pwd: "123456", permission: "2" },
    { user: "xuhaoran", pwd: "123456", permission: "0" },
  ],
  "userList|100":[{
    date: new Date()*1,
    name: '@cname(2,4)',
    address: '@province',
  }]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        res.send(data.list)
      });
      app.get('/api/admin',(req,res)=>{
        let { user, pwd } = req.query
        let loginUser = data.names.find(item=> {
          if(item.user === user && item.pwd === pwd){
            return item
          }
        })
        res.send(loginUser)
      });
      app.get('/api/user',(req,res)=>{
        // 拿到传过来的页码（第几页） 和 每页显示多少条数据
        let { page, pageSize} = req.query
        let list = data.userList.slice((page-1)*pageSize,page*pageSize)
        // 返回当前页的数据 和总数据数量（多少条数据）
        res.send({
          list,
          total:data.userList.length,
        })
      });
    }
  }
});
