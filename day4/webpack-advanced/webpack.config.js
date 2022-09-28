const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件

module.exports = {
    //打包环境
    mode:'development', 
    //入口
    entry:{
        index: `${__dirname}/src/index.js`
    },
    //出口
    output:{
        // 保存到当前项目目录下的dist文件夹内 如果没有dist 打包会自动生成dist文件夹
        path: path.resolve(__dirname,'dist'),
        // 我们在这个文件夹内的文件名
        filename: 'bundle.js',
    },
    module:{
        rules:[
            {
                //匹配以.css为后缀的文件
                test: /\.css$/,
                // 使用什么loader来解析该文件
                use:['style-loader','css-loader']
            },
            {
                //匹配以.vue为后缀的文件
                test: /\.vue$/,
                // 使用什么loader来解析该文件
                use:['vue-loader','vue-style-loader'],
                //node_modules 除外
                exclude:/node_modules/
            },
        ]
    },
    plugins: [//plugins 是插件模块
        new HtmlWebpackPlugin({//加载我们的HtmlWebpackPlugin插件
        title: 'Output Management',
        template:'./src/index.html'//template设置模板文件，自动创建的index.html会基于模板文件进行创建
     }) 
    ],
}