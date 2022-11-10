const { defineConfig } = require("@vue/cli-service");
const Mock = require("mockjs");
const data = Mock.mock({
  "userList|100":[
    {
      userName:'@cname(2,4)',
      "age|18-100":1,
      sex:'@character("男女")',
      uid:'@id'
    }
  ],
  users:[
    {
      userName: "张三",
      password: "123456",
      permission: "admin"
    },
    {
      userName: "李四",
      password: "123456",
      permission: "user"
    }
  ]
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        // 接收当前是第几页 每页显示多少条数据
        let { page, pageSize } = req.query
        // 从上一页截取到这一页 比如第一页就是 0截取到 page*pageSize
        let list = data.userList.slice((page-1)*pageSize,page*pageSize)
        // 返回分页后的数据和一个总数据条数
        res.send({list, total: data.userList.length})
      });
      app.get('/api/login',(req,res)=>{
        let { userName, pass} = req.query
        // 如果users里有这个用户 返回下标  如果没有 返回-1
        let index = data.users.findIndex(item=> item.userName == userName) 
        if(index == -1){
          return res.send({
            code: 400,
            message: '没有该用户'
          })
        }
        if(data.users[index].password != pass){
          return res.send({
            code: 400,
            message: '用户名或密码错误'
          })
        }
        res.send({
          code: 200,
          message: '登陆成功',
          permission: data.users[index].permission
        })
      });
      app.get('/api/delete',(req,res)=>{
        let { id } = req.query
        // 筛选出删除项的下标
        let index = data.userList.findIndex(item => item.uid == id)
        // 从数据里删除掉这一项
        data.userList.splice(index,1)
        res.send({
          code: 200,
          message: '删除成功',
        })
      });
    },
  }
});
