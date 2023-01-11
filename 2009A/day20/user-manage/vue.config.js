const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "tableList|100":[
    {
      id:'@id',
      date: +new Date(),
      name: '@cname(2,4)',
      address:'@city(true)'
    }
  ],
})

let user = [
  {
    userName: 'admin',
    password: '1234',
    code:1
  },
  {
    userName: 'zhangsan',
    password: '1234',
    code:0
  }
]
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let { page, pageSize } = req.query
        let list = [...data.tableList].slice((page-1) * pageSize, page * pageSize)
        let total = data.tableList.length
        res.json({list,total})
      })
      app.get('/api/login',(req,res)=>{
        let { userName, password } = req.query
        // 判断用户存不存在
        let userIndex = user.findIndex(item=> item.userName == userName)
        // 用户名不存在
        if(userIndex == -1){
          return res.json({error:'用户名不存在'})
        }
        //用户名存在时校验密码
        if(user[userIndex].password != password){
          return res.json({error:'用户名或密码错误'})
        }
        // 登陆成功
        res.json({success:'登陆成功',PermissionStatus: user[userIndex].code, userName})
      })
    }
  }
});
