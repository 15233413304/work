const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "list|100":[
    {
      id:'@id',
      name:'@cname(2,5)',
      address:'@county(true)',
      // 手机号正则 开头是1 第二位 3-9 后边接9位数字 $结尾
      phone: /^1[3-9]\d{9}$/,
      date: +new Date()
    }
  ]
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      // 获取列表
      app.get('/api/table',(req,res)=>{
        // 从请求传过来的参数中 解构出 page 页数  和 pageSize 每页多少条数据
        let { page, pageSize } = req.query
        // 拷贝一份新的数组 因为slice会操作原数组
        let list = [...data.list]
        // 发送一个对象 {list: 截取后的数据列表, total: 总数据条数}
        res.send({list:list.slice((page-1)*pageSize,page*pageSize),total:data.list.length})
      })
      // 删除
      app.get('/api/del',(req,res)=>{
        let { id, page, pageSize } = req.query
        // 找到删除的那一项的下标
        let index = data.list.findIndex(item=> item.id == id)
        // 使用splice 删除
        data.list.splice(index,1)
        // 拷贝一份新的数组 因为slice会操作原数组
        let list = [...data.list]
        // 发送一个对象 {list: 截取后的数据列表, total: 总数据条数}
        res.send({list:list.slice((page-1)*pageSize,page*pageSize),total:data.list.length})
      })
    }
  }
});
