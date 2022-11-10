const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
let data = Mock.mock({
  "list|20":[
    {
      title:'@ctitle',
      name: '@cname(5,10)'
    }
  ],
  nav: ['推荐','关注','周榜','月榜','最新'],
  "rightImg|3":['@image(100x100,@color)'],
  "leftTitle|10":['@ctitle(2)']
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/list',(req,res)=>{
        res.send(data)
      });
      app.get('/slice/list',(req,res)=>{
        let { idx } = req.query
        res.send({
          list: data.list.slice(idx*4,idx*4+4)
        })
      })
    }
  }
});
