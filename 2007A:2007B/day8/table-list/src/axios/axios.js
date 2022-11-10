//从axios包 引入 axios 
import axios from "axios";

var instance = axios.create();

// 设置超时时间
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
    // axios 每次请求后的数据会有一层 data对象包裹 如果在这写了.data 那么请求数据的时候 直接用res就可以
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//   抛出封装后的axios
export default axios