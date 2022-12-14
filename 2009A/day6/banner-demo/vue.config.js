const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
//  改变vue.config.js时一定要重启服务 才会生效

// 使用Mock.mock() 方法模拟数据
 let banner = Mock.mock({
    // list:[ 有十张色块模拟的图片 宽500px 高200px 随机颜色 ]
    "list|10":["@image(500x200,@color)"]
  })

  let shop = Mock.mock({
    "list|10":[
      {
        // 商品id
        id:'@id',
        // 商品图片
        img:"@image(50x50,@color)",
        // 商品名
        name: "@ctitle(2,7)",
        // 价格
        "price|10-90":1,
        // 数量
        count:1,
        // 是否选中
        isCheck: false
      }
    ]
  })

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    host:'localhost',
    open:true,
    // 使用 wbepack提供的 这个方法 （提供在服务器内部执行所有其他中间件之前执行自定义中间件的能力）
    // 使用axios请求这个接口的时候 会被这里拦截到
    onBeforeSetupMiddleware({app}){
      app.get('/api/banner',(req,res)=>{
        res.send(banner.list)
      })
      app.get('/api/shop',(req,res)=>{
        res.send(shop.list)
      })
    }
  },
});
