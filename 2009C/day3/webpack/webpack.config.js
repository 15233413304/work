// webpack.config.js 文件是一个webpack的配置文件 名字是固定的
// 这里使用的是nodejs commonjs规范
// 引入node内置path模块
const path = require('path')

// 单入口单出口打包
// module.exports = {
//     // 打包模式
//     mode:'development',
//     // 打包的入口文件
//     entry: `${__dirname}/src/main.js`,
//     // 打包出口的文件位置
//     output:{
//         // 出口的目录
//         path:path.resolve(__dirname,'dist'),
//         // 出口目录下的出口文件名字
//         filename: 'bundle.js'
//     }
// }

// 多入口单出口 入口使用数组[]
module.exports = {
    // 打包模式
    mode:'development',
    // 打包的入口文件
    entry: [`${__dirname}/src/main.js`,`${__dirname}/src/index.js`],
    // 打包出口的文件位置
    output:{
        // 出口的目录
        path:path.resolve(__dirname,'dist'),
        // 出口目录下的出口文件名字
        filename: 'bundle.js'
    }
}

// 多入口 多出口 { 打包模块名: 打包模块 }
// module.exports = {
//     // 打包模式
//     mode:'development',
//     // 打包的入口文件
//     entry: {
//         main:`${__dirname}/src/main.js`,
//         index:`${__dirname}/src/index.js`
//     },
//     // 打包出口的文件位置
//     output:{
//         // 出口的目录
//         path:path.resolve(__dirname,'dist'),
//         // 出口目录下的出口文件名字
//         filename: '[name].js'
//     }
// }