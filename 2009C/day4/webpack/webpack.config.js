// webpack.config.js 使用commonjs规范 nodejs语法
const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// npm i html-webpack-plugin -D 
// 打包后生成一个html 会自动引入打包后的出口文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// 抽离css文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// npm install css-minimizer-webpack-plugin --save-dev
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

// 导出模块的配置项
module.exports = {
    // mode 模式 
    // 默认为production production只对代码进行压缩打包
    // development 开发模式 可以对项目进行打包和优化配置
    mode: "development",
    // 入口文件
    entry: `${__dirname}/src/main.js`,
    // 打包出口
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        // webpack5.20.0以上版本可以在出口配置这个配置项
        //  打包时自动清理之前打包后的目录 和CleanWebpackPlugin作用一致
        clean: true,
    },
    // 存放loader
    module:{
        // 匹配loader的配置项
        rules:[
            // 解析vue的loader
            // npm i vue-loader vue-template-compiler -D   
            // vue-template-compiler 用来解析vue中的template的 但是不需要配置loader
            {test: /\.vue$/,use:'vue-loader'},
            // npm i babel-loader @babel/core @babel/preset-env -D
            // babel-loader 通过babel解析js代码 可以将es6转为es5 提高浏览器的兼容性
            // @babel/core  babel的一个库
            // @babel/preset-env 自动根据项目选择所需的babel 代替.babelrc 配置文件
            {
                test: /\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            // test 识别出哪些文件会被转换
            // use 定义出在进行转换时，应该使用哪个 loader
            // npm i css-loader style-loader -D 
            // css-loader 只是将css代码 转译为 js能识别的代码 但是不会作用到浏览器中
            // style-loader 将转译后的css样式 注入到html中
            // 注意：use里的loader 会从右向左 从下向上执行 
            {
                test: /\.css$/, 
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            // npm i css-loader style-loader sass sass-loader -D 
            // 匹配.sass或者.scss文件 先通过sass-loader将sass语法转为css可识别的代码
            // 然后再执行 css-loader 此处省略若干字
            {
                test: /\.s[ca]ss$/, 
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            // 解析图片
            {test: /\.(jpe?g|png|gif|webp|svg)$/, type:'asset/resource'}
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
          // `...`,
          new CssMinimizerPlugin(),
          new TerserPlugin(),
        ],
    },
    // 使用插件
    plugins:[
        // 打包时自动清理之前打包后的目录
        // new CleanWebpackPlugin()
        new HtmlWebpackPlugin({
            // 制定一个模板 用什么html来生成打包后的html
            template: './public/index.html',
            minify:{
                // 去掉空格
                collapseWhitespace: true,
                keepClosingSlash: true,
                // 删除注释
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new VueLoaderPlugin(),
        // 使用这个插件需要把style-loader删掉
        new MiniCssExtractPlugin({
            filename:'assets/index.css'
        })
    ],
    // npm i webpack-dev-server -D 
    devServer:{
        // 域名 localhost指的是本机的ip
        host: 'localhost',
        // 端口号
        port: '8080',
        // 是否在启动服务之后自动打开浏览器
        open: true,
        // 是否开启模块热重载
        hot: true,
    }
}