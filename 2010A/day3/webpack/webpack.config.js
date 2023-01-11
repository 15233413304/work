const path = require('path');
// webpack.config.js 名字是固定的 是webpack的打包配置文件 打包时会查找这个文件
// 单入口 单出口
// module.exports = {
//     // 打包模式
//     mode:'development',
//     // 打包的入口文件
//     entry:'./src/main.js',
//     // 打包的出口文件
//     output:{
//         // 出口文件存放的位置（文件夹）
//         path: path.resolve(__dirname,'dist'),
//         // 打包后的文件名
//         filename:'bundle.js'
//     }
// }

// 多入口 单出口
// module.exports = {
//      // 打包模式
//      mode:'development',
//      // 打包的入口文件
//      entry:['./src/main.js','./src/index.js'],
//      // 打包的出口文件
//      output:{
//          // 出口文件存放的位置（文件夹）
//          path: path.resolve(__dirname,'dist'),
//          // 打包后的文件名
//          filename:'bundle.js'
//      }
// }


// 多入口 多出口
module.exports = {
    // 打包模式
    mode:'development',
    // 打包的入口文件
    entry:{
        'my-main':'./src/main.js',
        'my-index':'./src/index.js'
    },
    // 打包的出口文件
    output:{
        // 出口文件存放的位置（文件夹）
        path: path.resolve(__dirname,'dist'),
        // 打包后的文件名
        filename:'[name].js'
    }
}