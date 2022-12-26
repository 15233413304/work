const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')

const data = Mock.mock({
  "0|40":[{
    id:'@id',
    name:'@ctitle(2,8)',
    "price|100-200":1,
    img:'@image(100x100,@color)',
    detailData:{
      "banner|5":['@image(300x150,@color)'],
    },
  }],
  "1|30":[{
    id:'@id',
    name:'@ctitle(2,8)',
    "price|100-200":1,
    img:'@image(100x100,@color)',
    detailData:{
      "banner|5":['@image(300x150,@color)'],
    },

  }],
  "2|40":[{
    id:'@id',
    name:'@ctitle(2,8)',
    "price|100-200":1,
    img:'@image(100x100,@color)',
    detailData:{
      "banner|5":['@image(300x150,@color)'],
    },
  }],
  "3|40":[{
    id:'@id',
    name:'@ctitle(2,8)',
    "price|100-200":1,
    img:'@image(100x100,@color)',
    detailData:{
      "banner|5":['@image(300x150,@color)'],
    },
  }],
})

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let { tab } = req.query
        res.json(data[tab])
      })
      app.get('/api/detail',(req,res)=>{
        let {tab, id} = req.query
        let detail = data[tab].find(item=> item.id == id)
        res.json(detail)
      })
    }
  }
});
