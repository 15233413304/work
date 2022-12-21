const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const data = Mock.mock({
  // 首页数据
  "list|200":[{
    name:'@ctitle(2,10)',
    "price|100-200":1,
    img:'@image(100x100,@color)',
    "detailImg|6":['@image(300x150,@color)'],
    id:'@id'
  }],
  // 分类页数据
  classList:{
    "0|30":[{
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }],
    "1|30":[{
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }],
    "2|30":[{
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }],
    "3|30":[{
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }],
    "4|30":[{
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }],
    "5|30":[{
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }],
    "6|30":[{
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }],
    
  }
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        let = {page, pageSize} = req.query
        // 拷贝一份源数据
        let list = [...data.list]
        let sliceList = list.slice(0,page*pageSize)
        let total = data.list.length
        res.send({list:sliceList, total})
      })
      app.get('/api/class',(req,res)=>{
        res.send(data.classList)
      })
      app.get('/api/detail',(req,res)=>{
        let { id } = req.query
        let detail = data.list.find(item => item.id == id)
        res.send(detail)
      })
    }
  }
});
