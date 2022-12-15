const { defineConfig } = require('@vue/cli-service')
const Mock = require('mockjs')

  const data = Mock.mock({
    "list|5":[
      {
        name:'@cname(2,4)',
        "age|20-40":1,
        time: +new Date(),
        id: '@id'
      }
    ]
  })
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        res.send(data.list)
      })
    }
  }
})
