const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// 生成html 这个html会自动引入打包后的js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 每次打包都会清理之前的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 打包模式
    mode:'development',
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    // 存放loader
    module:{
        // 匹配loader
        rules:[
            // test匹配规则 正则匹配 use 使用什么loader来解析这个文件
            // 解析.vue文件
            {test: /\.vue$/,use:'vue-loader'},
            // use 需要使用多个loader时 可以使用数组 数组里loader的顺序是从右到左执行 
            // 解析scss  先转为css  再解析为js 注入到html中
            {test: /\.s[ca]ss$/, use: ['style-loader','css-lodaer','sass-loader']},
            // 解析js 转换为es5
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // 解析图片
            {test: /\.(jpe?g|png|gif|webp|svg)$/, type:"asset/resource"}
        ]
    },
    // 使用插件
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify:{
                // 去掉空格
                collapseWhitespace: true,
                // 删除注释
                removeComments: true,
            }
        }),
        new CleanWebpackPlugin(),
    ],
    devServer:{
        //域名
        host:'localhost',
        // 端口号
        port: '8080',
        // 是否在启服务后打开浏览器
        open: true,
        // 是否热重载
        hot: true
    }
}