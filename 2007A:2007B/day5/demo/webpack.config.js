const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    // 打包模式
    mode:"development",
    // 入口文件
    entry: `${__dirname}/main.js`,
    // 出口文件
    output:{
        path: path.resolve(__dirname,'public'),
        filename: 'index.js'
    },
    devServer: {
        // 域名
        host: 'localhost',
        // 端口号
        port: '8080',
        // 是否在启动服务后打开浏览器
        open: true,
        // 是否热重载
        hot: true,
    },
    plugins:[
        new HtmlWebpackPlugin({ 
            template: './src/main.html',
            minify:{
                // 去掉空格
                collapseWhitespace: true,
                // 删除注释
                removeComments: true,
            }
        }),
        new CleanWebpackPlugin(),
        // new VueLoaderPlugin(),
    ],
    module: {
        rules: [
           {
            test: [/\.css$/,/\.s[ac]ss$/i],
            use:['style-loader','css-loader','sass-loader']
           },
           {
            test: /\.vue$/,
            use: 'vue-loader'
           }
        ],
    },
}