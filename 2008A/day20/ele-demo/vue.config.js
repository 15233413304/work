const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "list|100":[
    {
      // 日期
      date: +new Date(),
      // 用户名
      name: '@cname(2,4)',
      // 用户的地址
      address: "@county",
      // 用户id
      id: '@id'
    }
  ]
})
// 用户的后台账号
const userInfo = [
  {
    // 登陆人的用户名
    username:'admin',
    // 登陆人的密码
    password:'123456',
    // 登陆人的权限
    permission:1
  },
  {
    username:'admin2',
    password:'246810',
    permission:2
  },
  {
    username:'zhangsan',
    password:'123456',
    permission:0
  }
]

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      // 登陆接口
      app.get('/api/login',(req,res)=>{
        // 从传递来的参数中 解构 用户名和密码
        let { username, password } = req.query
        // 判断该用户是否存在 看这个用户名在不在 后台账户中
        let index = userInfo.findIndex(item=> item.username == username)
        if(index == -1){
          // 用户名不存在
          return res.send({ message: '用户名不存在，请检查是否拼写错误' })
        }
        // 如果用户名存在 那就判断密码
        if(userInfo[index].password != password){
          // 密码不匹配
          return res.send({ message: '用户名或密码不正确，请检查是否拼写错误' })
        }
        // 以上条件都不是 说明用户名密码都正确 登陆成功
        res.send({success:'登陆成功',token: +new Date(),code: userInfo[index].permission})
      });
      // 获取列表
      app.get('/api/list',(req,res)=>{
        // 返回用户列表
        res.send(data.list)
      })
      // 新增
      app.get('/api/add',(req,res)=>{
        // 从传递过来的参数中 解构 用户id 用户的创建日期 用户名 用户地址
        let { id, date, name, address } = req.query
        // 从数组的头部追加内容 使新增的用户在最上方显示
        data.list.unshift({ id, date, name, address })
        // unshift会操作原数组 返回数据
        res.send(data.list)
      })
      // 修改
      app.get('/api/update',(req,res)=>{
        // 从传递过来的参数中 解构 用户id 用户的创建日期 用户名 用户地址
        let { id, date, name, address } = req.query
        // 找到用户所在的下标
        let index = data.list.findIndex(item=> item.id == id)
        // 通过splice 进行替换
        data.list.splice(index,1,{id, date, name, address})
        // splice会操作原数组 返回数据
        res.send(data.list)
      })
      //删除
      app.get('/api/delete',(req,res)=>{
        // 从传递过来的参数中 解构 用户id
        let { id } = req.query
        // 找到用户所在的下标
        let index = data.list.findIndex(item=> item.id == id)
        // 通过splice 删除用户
        data.list.splice(index,1)
        // splice会操作原数组 返回数据
        res.send(data.list)
      })
    }
  }
});
