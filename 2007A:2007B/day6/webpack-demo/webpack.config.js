const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 打包模式
    mode: 'development',
    // 打包入口
    // entry: path.resolve(__dirname,'./src/main.js')
    entry: `${__dirname}/src/main.js`,

    // 打包出口
    output: {
        path: path.resolve(__dirname,'public'),
        filename: 'index.js'
    },
    // loader
    module:{
        // 匹配规则
        rules:[
            {
                // 匹配以.css为后缀的文件 以.sass或.scss为后缀的文件
                test: [/\.css$/i,/\.s[ac]ss$/i],
                // 使用什么loader来解析
                // style-loader 一定要写在 css-loader前面
                // 因为 loader是 从下到上 从右到左执行的
                //  需要先解析scss 在解析css 然后才能添加到页面的style样式里
                // 解析sass/scss 需要下载两个包 sass sass-loader
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    //plugins  插件
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./src/index.html'),
        }),
        new CleanWebpackPlugin()
    ],
    devServer:{
        host: 'localhost',
        port: '8080',
        open: true,
        hot: true
    }
}