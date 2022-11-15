const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    host:'localhost',
    port:'8001',
    // 自动打开默认浏览器
    open: true,
  }
});
