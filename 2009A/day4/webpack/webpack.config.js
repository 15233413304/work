// webpack.config.js 里使用的是 commonjs规范 nodejs语法
const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
// 每次打包都会清理上一次的打包目录
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// npm i html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    // 打包模式
    mode:'development',
    // 入口文件
    entry:`${__dirname}/src/main.js`,
    // 打包出口
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        // 5.20.0+ clean 和 CleanWebpackPlugin 做的是一个事情
        clean: true,
    },
    // 用来存放loader配置的
    module:{
        // loader的匹配规则和配置项
        rules:[
            // npm i vue-loader vue-template-compiler -D
            // vue-loader 解析vue语法  vue-template-compiler生成vue模板
            {
                test: /\.vue$/,
                use:'vue-loader'
            },
            // npm i style-loader css-loader -D
            {
                test: /\.css$/,
                // css-loader是将 css解析成js能识别的代码 但是不会放到浏览器里 只是解析
                // style-loader 将css-loader解析后的代码 注入到html中
                // 注意： 使用多个loader的时候 loader的顺序是从右到左 从下到上执行
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            // npm i sass sass-loader -D
            {
                test: /\.s[ca]ss$/,
                // sass-loader 将.scss/.sass 为后缀的文件转为css代码
                // css-loader是将 css解析成js能识别的代码 但是不会放到浏览器里 只是解析
                // style-loader 将css-loader解析后的代码 注入到html中
                // 注意： 使用多个loader的时候 loader的顺序是从右到左 从下到上执行
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            // 打包图片 webpack官网 中文文档 指南 资源模块 
            //代替webpack5之前的 file-loader ( type: 'asset/resource' )
            //代替webpack5之前的 url-loader ( type: 'asset/inline' )
            //代替webpack5之前的 raw-loader ( type: 'asset/source' )
            {test: /\.(jpe?g｜png|gif|webp|svg)$/,type:'asset/inline'}
        ]
    },
    // 优化项
    optimization: {
        // development 模式下需要将 minimize设置成true
        minimize: true,
        // 使用优化插件
        minimizer: [new TerserPlugin(),new CssMinimizerPlugin(),],
    },    
    // 插件
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // 用什么html文件来生成打包后的html
            template:'./src/publick/index.html',
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
        }),
        // 压缩css的插件 使用这个插件需要删除 style-loader
        new MiniCssExtractPlugin({
            // 打包后的css 文件存放目录及名字
            filename: 'index.css'
        })
        // new CleanWebpackPlugin()
    ],
    // npm i webpack-dev-server -D
    devServer:{
        // 设置服务启动所在的域名 localhost本机的IP地址 相当于172.20.11.21
        host:'localhost',
        // 端口号
        port: 8080,
        // 启动服务后自动打开默认浏览器
        open: true,
        // 模块热重载
        hot: true
    }
}