const path = require('path');

// 单入口单出口

// // 抛出配置项
// module.exports = {
//     // 打包模式
//     mode:'development',
//     // 打包的入口文件
//     entry: `${__dirname}/src/main.js`,
//     // 打包的出口文件
//     output:{
//         // 打包到名为dist的文件夹下
//         path: path.resolve(__dirname, 'dist'),
//         // 对打包后的js文件命名
//         filename: 'bundle.js',
//     }
// }

// 多入口单出口
// // 抛出配置项
module.exports = {
    // 打包模式
    mode:'development',
    // 打包的入口文件
    entry: [`${__dirname}/src/main.js`,`${__dirname}/src/main1.js`,`${__dirname}/src/main2.js`,],
    // 打包的出口文件
    output:{
        // 打包到名为dist的文件夹下
        path: path.resolve(__dirname, 'dist'),
        // 对打包后的js文件命名
        filename: 'bundle.js',
    }
}


// // 多入口多出口
// // // 抛出配置项
// module.exports = {
//     // 打包模式
//     mode:'development',
//     // 打包的入口文件
//     entry: {
//         bundle:`${__dirname}/src/main.js`,
//         bundle1:`${__dirname}/src/main1.js`,
//         bundle2:`${__dirname}/src/main2.js`,
//     },
//     // 打包的出口文件
//     output:{
//         // 打包到名为dist的文件夹下
//         path: path.resolve(__dirname, 'dist'),
//         // 对打包后的js文件命名
//         filename: '[name].js',
//     }
// }

