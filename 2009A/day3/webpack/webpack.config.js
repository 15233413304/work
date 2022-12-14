// 使用webpack时 可以配置一个 webpack.config.js 配置文件 名字是固定的
// webpack.config.js 使用的是nodejs
// 引入nodejs内置模块 path
const path = require('path')
// 单入口单出口 
// module.exports = {
//     // 打包模式
//     mode:'development',
//     // 打包的入口文件
//     entry: `${__dirname}/src/main.js`,
//     // 打包的出口文件放在哪
//     output: {
//         // 打包到项目目录下的一个叫dist的文件夹里
//         path: path.resolve(__dirname,'dist'),
//         // 打包后js文件的名字
//         filename: 'bundle.js'
//     }
// }

// 多入口 单出口
// module.exports = {
//     // 打包模式
//     mode:'development',
//     // 打包的入口文件
//     entry: [`${__dirname}/src/main.js`,`${__dirname}/src/index.js`],
//     // 打包的出口文件放在哪
//     output: {
//         // 打包到项目目录下的一个叫dist的文件夹里
//         path: path.resolve(__dirname,'dist'),
//         // 打包后js文件的名字
//         filename: 'bundle.js'
//     }
// }
// 多入口多出口
module.exports = {
    // 打包模式
    mode:'development',
    // 打包的入口文件
    entry: {
        bundle1:`${__dirname}/src/index.js`,
        bundle2:`${__dirname}/src/main.js`,
    },
    // 打包的出口文件放在哪
    output: {
        // 打包到项目目录下的一个叫dist的文件夹里
        path: path.resolve(__dirname,'dist'),
        // 打包后js文件的名字
        filename: '[name].js'
    }
}