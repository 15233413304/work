const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  // mock一个数组 里面有40个对象
  "list|40":[{
    id:'@id',
    date: +new Date(),
    name: '@cname(2,4)',
    province: '北京',
    city: '八维',
    address: '北京八维 网站学院 弄不了',
    "zip|100000-999999": 1
  }]
})


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      // 请求数据列表 接口
      app.get('/api/list',(_,res)=>{
        res.send(data.list)
      })
    }
  }
});
