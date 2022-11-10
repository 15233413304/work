// node内置模块 可以用来引用路径
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 打包环境
    mode:'development',
    // 入口文件
    // 获取当前目录下的index.js作为入口
    // 多入口多出口 enrty 用 {模块名: 模块位置,模块名1: 模块位置1} 出口的filename '[name].js'
    // entry: {
    //     index:`${__dirname}/src/index.js`,
    //     index1:`${__dirname}/src/a.js`,
    //     index2:`${__dirname}/src/b.js`
    // },
    // 多入口单出口 enrty 用 [模块位置,模块位置1,模块位置2] 出口的filename 随便起一个文件名.js
    entry:[`${__dirname}/src/index.js`,`${__dirname}/src/a.js`,`${__dirname}/src/b.js`],
    output:{
        // 保存到当前目录下的dist文件夹内 如果没有dist 打包时会自动创建
        path: path.resolve(__dirname,'public'),
        // 给打包后的文件起一个名字
        filename: 'index.js'
    },
    module:{
        rules:[
            {   
                //匹配以.css为后缀的文件
                test: /\.css$/,
                // 使用什么loader来解析该文件
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    devServer:{
        static:'./public',
        host:'localhost',
        port:'8080',
        open: true,
        hot:true,
    }
}