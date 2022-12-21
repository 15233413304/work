const { defineConfig } = require("@vue/cli-service");
const Mock = require('mockjs')
const data = Mock.mock({
  "list|200":[
    {
      name:'@ctitle(2,10)',
      "price|100-200":1,
      img:'@image(100x100,@color)',
      id:'@id'
    }
  ],
  "classList":{
    "0|10":[
      {
        name:'@ctitle(2,10)',
        "price|100-200":1,
        img:'@image(100x100,@color)',
        id:'@id'
      }
    ],
    "1|20":[
      {
        name:'@ctitle(2,10)',
        "price|100-200":1,
        img:'@image(100x100,@color)',
        id:'@id'
      }
    ],
    "2|10":[
      {
        name:'@ctitle(2,10)',
        "price|100-200":1,
        img:'@image(100x100,@color)',
        id:'@id'
      }
    ],
    "3|30":[
      {
        name:'@ctitle(2,10)',
        "price|100-200":1,
        img:'@image(100x100,@color)',
        id:'@id'
      }
    ],
    "4|15":[
      {
        name:'@ctitle(2,10)',
        "price|100-200":1,
        img:'@image(100x100,@color)'
      }
    ],
    "5|25":[
      {
        name:'@ctitle(2,10)',
        "price|100-200":1,
        img:'@image(100x100,@color)',
        id:'@id'
      }
    ],
    "6|40":[
      {
        name:'@ctitle(2,10)',
        "price|100-200":1,
        img:'@image(100x100,@color)',
        id:'@id'
      }
    ],
    
  }
})
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    onBeforeSetupMiddleware({app}){
      app.get('/api/list',(req,res)=>{
        const { page, pageSize } = req.query
        // 拷贝一份源数据
        let list = [...data.list]
        // 移动端分页 是上拉加载 上拉加载越加载数据量应该越多 所以要从0开始截取 
        // 根据页码增长而增加数据量
        let sendList = list.slice(0, page*pageSize)
        // 总数据条数
        let total = data.list.length
        res.send({list: sendList, total})
      })
      app.get('/api/class',(req,res)=>{
        res.send(data.classList)
      })
    }
  }
});
