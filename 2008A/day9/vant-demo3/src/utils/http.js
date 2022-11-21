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