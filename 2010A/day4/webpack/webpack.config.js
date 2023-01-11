const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 压缩css
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    // 打包模式 环境
    mode:'development',
    // 入口文件 打包前的文件
    entry: './src/main.js',
    // 打包出口 打包后的文件
    output:{
        // 打包的出口文件夹目录
        path: path.resolve(__dirname,'dist'),
        // 打包的出口文件
        filename: 'bundle.js',
        // 5.20.0+ 版本使用 和 CleanWebpackPlugin 做的事一样的操作
        // 打包时 清空打包所在目录
        clean: true
    },
    // 存放loader配置的对象 loader就是用来解析js不识别的文件类型内容 
    // 不是js或者json的代码都需要使用loader解析
    module:{
        // loader的配置
        rules:[
            // 解析css的loader
            // npm i css-loader style-loader -D
            {
                // 匹配的文件类型 
                test: /\.css$/i,
                // 使用什么loader来解析这个文件
                // 解析顺序从右到左 从下到上
                // 一定是先解析css-loader 再解析style-loader
                use: [MiniCssExtractPlugin.loader,"css-loader"],
            },
            // 解析scss 的 loader
            // npm i sass sass-loader -D
            {
                test: /\.s[ca]ss$/i,
                use:[MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
            },
            // 解析 .vue文件
            // npm i vue@2.7.14 -S 
            // npm i vue-loader@15.0.1 vue-template-compiler -D
            {
                test: /\.vue$/i,
                use: 'vue-loader'
            },
            // 打包图片 
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/, type:'asset/inline'
            }
        ]
    },
    // 项目优化配置
    optimization: {
        // development模式下开启优化
        minimize: true,
        // 使用插件
        minimizer: [new TerserPlugin(),new CssMinimizerPlugin()],
    },
    // 使用插件
    plugins:[
        // vue-loader 需要配合 VueLoaderPlugin 这个插件使用
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // css文件打包后的名字
            filename: 'index.css'
        }),
        new HtmlWebpackPlugin({
            // 使用什么html模板文件 来生成打包后的html
            template: './src/public/index.html',
            minify:{
                // 去掉空格
                collapseWhitespace: true,
                keepClosingSlash: true,
                // 去掉注释
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
              }
        })
    ],
    // webpack脚手架的启服务包
    // npm i webpack-dev-server -D
    // 启动服务的命令 npx webpack serve
    devServer:{
        // 模块热替换
        // hot: true,
        // 自动打开浏览器
        open: true,
        // 设置启服务后 项目的域名 localhost指的是本机的域名
        host: 'localhost',
        // 设置启服务后 项目的端口号
        port: 8080,
    }
}