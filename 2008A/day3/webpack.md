前端为什么要组件化开发

> 组件化的目的，是为了让页面中的各个部分可以被复用，以减少重复的代码。另一方面，也可以更好地使团队分工协作，让不同的人负责编写不同的组件。

> 一个网页不再是由一个个独立的HTML、CSS和JavaScript文件组成的了，而是按照组件的思想将网页划分成一个个组件，如轮播图组件、列表组件、导航栏组件等。将这些组件拼装在一起，就形成一个完整的网页了。

### 单页面应用和webpack

##### 1、vue后缀文件

##### .vue文件

.vue文件，称为单文件组件，是Vue.js自定义的一种文件格式，一个.vue文件就是一个单独的组件，在文件内封装了组件相关的代码：html、css、js

.vue文件由三部分组成：<template>、<style>、<script>

1.el是什么
提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是css选择器，也可以是一个HTML元素实例。如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显示调用vm.$mount()手动开启编译

2.template是什么
一个字符串模板作为Vue实例的标识使用。模板将会替换挂载的元素，挂载元素的内容都将被忽略。如下

将实例中template属性值进行编译，并将编译后的dom替换掉vue实例绑定的元素，如果该vue实例绑定的元素中存在内容，这些内容会直接被覆盖。
特点：

1）如果vue实例中有template属性，会将该属性值进行编译，将编译后的虚拟dom直接替换掉vue实例绑定的元素（即el绑定的那个元素）；
2）template属性中的dom结构只能有一个根元素，如果有多个根元素需要使用v-if、v-else、v-else-if设置成只显示其中一个根元素；
3）在该属性对应的属性值中可以使用vue实例

### Vue初始化到挂载的流程图

![img](https://img-blog.csdnimg.cn/20201118151344874.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDU4NDQ0Mg==,size_16,color_FFFFFF,t_70)

##### vue-loader

浏览器本身并不认.vue文件，所以必须对.vue文件进行加载解析，此时需要vue-loader
类似的loader还有许多，如：html-loader、css-loader、style-loader、babel-loader等
需要注意的是vue-loader是基于webpack的

  vuejs 自定义了一种.vue文件，可以把html, css, js 写到一个文件中，从而实现了对一个组件的封装， 一个.vue 文件就是一个单独的组件。由于.vue文件是自定义的，浏览器不认识，所以需要对该文件进行解析。 在webpack构建中，需要安装vue-loader 对.vue文件进行解析。在 sumlime 编辑器中，我们 书写.vue 文件，可以安装vue syntax highlight 插件，增加对文件的支持。

### 什么是 Webpack
Webpack 是为浏览器构建 JavaScirpt 模块脚本的前端打包工具

### 为什么使用 Webpack
浏览器不能识别.vue文件，我们需要把.vue文件打包成浏览器识别的js文件



webpack会以 ./src/index.js为入口文件开始打包，打包后输出到./build/build.js 整体打包环境是开发环境

### webpack安装步骤

1、npm init -y初始化一个包描述文件（我们要开始下包了）

2、安装webpack和webpack-cli

全局安装：npm install webpack webpack-cli -g

局部安装：npm install webpack webpack-cli -D

注意：如果想选择版本的话：npm install webpack@5 webpack-cli@5 -g



3、创建一个文件webpack.config.js （注意：此文件名不能写别的名字）

	module.exports = {
		mode:'development',//设置模式是开发模式
		 //__dirname是nodejs的全局变量，指向当前执行的脚本所在的目录
		entry:__dirname + '/src/index.js',//唯一的入口文件
		output:{
			path:__dirname +'/builds',//打包后存放的路径
			filename:'bundle.js'//打包成功输出的文件叫这个名
		}
	}

4、对于webpack，一切皆模块。webpack 只能理解 JavaScript 和 JSON 文件，其他类型/后缀的文件都需要经过 [loader](https://webpack.docschina.org/concepts/loaders/) 处理，将它们转换为js可识别的有效[模块](https://webpack.docschina.org/concepts/modules) 。

loader可以将.vue文件转换成js文件,可以做语言翻译(比如将文件从 TypeScript 转换为 JavaScript) 

格式转换(将内联图像转换为 data URL)

#### loader 是什么

每个 loader 本质上都是一个导出为**函数**的 JavaScript 模块。[loader runner](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fwebpack%2Floader-runner) 会调用此函数，将资源文件或者上一个 loader 产生的结果传进去，经过编译转换把处理结果再输出去（如果后面还有 loader 就传给下一个）。函数中的 this 作为上下文会被 webpack 填充，并且 [loader runner](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fwebpack%2Floader-runner) 中包含一些实用的方法，比如可以使 loader 调用方式变为异步，或者获取 query 参数。
简言之 loader 就是模块转换器。

![Webpack 加载模块](https://images.cnblogs.com/cnblogs_com/blogs/406017/galleries/1955908/o_210601025520%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210601105426.png)



还有样式编译

在 webpack 的配置中 **loader** 有两个目标：

1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。

**webpack.config.js**

```
module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

```

### 配置方式

关于 loader 的配置，我们是写在 module.rules 属性中，属性介绍如下：

- rules 是一个数组的形式，因此我们可以配置很多个 loader
- 每一个 loader 对应一个对象的形式，对象属性 test 为匹配的规则，一般情况为正则表达式
- 属性 use 针对匹配到文件类型，调用对应的 loader 进行处理

代码编写，如下形式：

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};

```

### 3、常见的 loader

在页面开发过程中，我们经常性加载除了 js 文件以外的内容，这时候我们就需要配置响应的 loader 进行加载

常见的 loader 如下：

- style-loader: 将 css 添加到 DOM 的内联样式标签 style 里

- css-loader :允许将 css 文件通过 require 的方式引入，并返回 css 代码

- ##### less-loader: 处理 less

- ##### sass-loader: 处理 sass

- postcss-loader: 用 postcss 来处理 CSS

- autoprefixer-loader: 处理 CSS3 属性前缀，已被弃用，建议直接使用 postcss

- file-loader: 分发文件到 output 目录并返回相对路径

- url-loader: 和 file-loader 类似，但是当文件小于设定的 limit 时可以返回一个 Data Url

- ##### html-minify-loader: 压缩 HTML

- ##### babel-loader :用 babel 来转换 ES6 文件到 ES5之前

下面给出一些常见的 loader 的使用：

#### css-loader

分析 css 模块之间的关系，并合成⼀个 css

```
npm install --save-dev css-loader

```

```
rules: [
  ...,
 {
  test: /\.css$/,
    use: {
      loader: "css-loader",
      options: {
     // 启用/禁用 url() 处理
     url: true,
     // 启用/禁用 @import 处理
     import: true,
        // 启用/禁用 Sourcemap
        sourceMap: false
      }
    }
 }
]

```

如果只通过 css-loader 加载文件，这时候页面代码设置的样式并没有生效

原因在于，css-loader 只是负责将.css 文件进行一个解析，而并不会将解析后的 css 插入到页面中

如果我们希望再完成插入 style 的操作，那么我们还需要另外一个 loader，就是 style-loader

#### style-loader[#](https://www.cnblogs.com/frank-link/p/14836316.html#style-loader)

把 css-loader 生成的内容，用 style 标签挂载到页面的 head 中

```
npm install --save-dev style-loader

```

```
rules: [
  ...,
 {
  test: /\.css$/,
    use: ["style-loader", "css-loader"]
 }
]

```

同一个任务的 loader 可以同时挂载多个，处理顺序为：从右到左，从下往上

#### less-loader[#](https://www.cnblogs.com/frank-link/p/14836316.html#less-loader)

开发中，我们也常常会使用 less、sass、stylus 预处理器编写 css 样式，使开发效率提高，这里需要使用 less-loader

```
npm install less-loader -D

```

```
rules: [
  ...,
 {
  test: /\.css$/,
    use: ["style-loader", "css-loader","less-loader"]
 }
]

```

#### raw-loader[#](https://www.cnblogs.com/frank-link/p/14836316.html#raw-loader)

在 webpack 中通过 import 方式导入文件内容，该 loader 并不是内置的，所以首先要安装

```
npm install --save-dev raw-loader

```

然后在 webpack.config.js 中进行配置

```
module.exports = {
  ...,
  module: {
      rules: [
      {
        test: /\.(txt|md)$/,
        use: 'raw-loader'
     }
    ]
 }
}

```

#### file-loader[#](https://www.cnblogs.com/frank-link/p/14836316.html#file-loader)

把识别出的资源模块，移动到指定的输出⽬目录，并且返回这个资源在输出目录的地址(字符串)

```
npm install --save-dev file-loader

```

然后在 webpack.config.js 中进行配置

```
rules: [
  ...,
 {
  test: /\.(png|jpe?g|gif)$/,
    use: {
      loader: "file-loader",
      options: {
        // placeholder 占位符 [name] 源资源模块的名称
        // [ext] 源资源模块的后缀
        name: "[name]_[hash].[ext]",
        //打包后的存放位置
        outputPath: "./images",
        // 打包后文件的 url
        publicPath: './images',
      }
    }
 }
]

```

#### url-loader[#](https://www.cnblogs.com/frank-link/p/14836316.html#url-loader)

可以处理理 file-loader 所有的事情，但是遇到图片格式的模块，可以选择性的把图片转成 base64 格式的字符串，并打包到 js 中，对小体积的图片比较合适，大图片不合适。

```
npm install --save-dev url-loader

rules: [
  ...,
 {
  test: /\.(png|jpe?g|gif)$/,
    use: {
      loader: "url-loader",
      options: {
        // placeholder 占位符 [name] 源资源模块的名称
        // [ext] 源资源模块的后缀
        name: "[name]_[hash].[ext]",
        //打包后的存放位置
        outputPath: "./images"
        // 打包后文件的 url
        publicPath: './images',
        // 小于 100 字节转成 base64 格式
        limit: 100
      }
    }
 }
]
```

# clean-webpack-plugin

npm install clean-webpack-plugin --save-dev

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 注意解构赋值

// 清空指定的打包目录，这里不用配置哪个目录，会自动找到 output 指定的输出目录
new CleanWebpackPlugin()

