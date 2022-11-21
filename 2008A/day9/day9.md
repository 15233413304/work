### 使用vant渲染列表

一、搭建脚手架
````shell
vue create 项目名
````

二、安装[vant-ui](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/quickstart)

````shell
# Vue 2 项目，安装 Vant 2：
npm i vant@latest-v2 -S
````

三、使用vant-ui

````js
//在main.js中
// 引入vant-ui库
import Vant from 'vant';
// 引入vant-ui库的样式
import 'vant/lib/index.css';
// 使用vant-ui库
Vue.use(Vant);
````

四、下载 mockjs 用于模拟数据 下载axios用于请求数据

````shell
npm i axios mockjs -D
````
mock模拟数据. 在vue.config.js中

```js
// 引入mockjs
const Mock = require('mockjs')

// 模拟数据
const data = Mock.mock({
  "list|20":[
    {
      // list列表里有20条数据 每条数据里有个商品名 goods: 2-6个中文
      goods:'@ctitle(2,6)',
      // 每条数据里有个商品价格 price: 10到100 数字
      "price|10-100":0,
      // 每条数据里有个商品id id:独一无二的值
      id: "@id"
    }
  ]
})
```

去[webpack官网](https://webpack.docschina.org/configuration/dev-server#devserveronbeforesetupmiddleware)粘过来 devServer里的onBeforeSetupMiddleware 在vue.config.js中


````js
devServer: {
    onBeforeSetupMiddleware: function ({app}) {
      app.get('/api/list', function (req, res) {
        res.json(data.list);
      });
    },
  },
````

五、[axios二次封装](http://axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8)
````js 
//可以在 src目录下新建一个文件夹。名字自己定义语义化即可。  src/utils/http.js

//在这个文件中
import axios  from "axios";
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
  	// 可以在这里写个.data  因为axios请求都会返回一层data包裹着 所以写一个.data 
  	// 在页面中使用response就不需要.data
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default axios

````

​	  

六、根据合适的需求使用vant组件

