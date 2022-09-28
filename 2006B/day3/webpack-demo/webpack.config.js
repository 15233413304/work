const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
       index: './index.js',
       index1: './index1.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer:{
        static:'./dist', //设置服务器访问基本目录
        host:'localhost', //服务器的ip地址
        port:'8080',  //端口  
        open: true, //自动打开页面
    },
}