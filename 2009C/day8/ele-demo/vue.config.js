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
        res.send(data.list);
      });
    },
  },
});
