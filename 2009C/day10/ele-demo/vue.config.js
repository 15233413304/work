const { defineConfig } = require("@vue/cli-service");
const Mock = require("mockjs");

const data = Mock.mock({
  "list|100": [
    {
      id: "@id",
      name: "@cname(2,5)",
      address: "@county(true)",
      // 在企业中 后段返回时间 一定是时间戳的形式
      date: new Date().getTime(),
      // 模拟手机号 开头是一个1 第二位是3-9 后边是9个数字 结尾
      phone: /^1[3-9]\d{9}$/,
    },
  ],
});

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    onBeforeSetupMiddleware({ app }) {
      app.get("/api/list", (req, res) => {
        let { page, pageSize } = req.query
        // 分页要用slice方法 会操作原数组 所以拷贝一份新的数组
        let list = [...data.list]
        // 发送一个 {list: 根据页码数和每页显示条数截取后的数据, total: 一共有多少条数据}
        res.send({list: list.slice((page-1)*pageSize,page*pageSize),total: data.list.length});
      });
      app.get('/api/del',(req,res) => {
        let { id, page, pageSize } = req.query
        // 删除那项的id
        let index = data.list.findIndex(item => item.id == id)
        // 通过splice操作原数组 删除掉这一项
        data.list.splice(index,1)
        let list = [...data.list]
        res.send({list: list.slice((page-1)*pageSize,page*pageSize),total: data.list.length});
      })
    },
  },
});
