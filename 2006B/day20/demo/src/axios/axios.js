import axios from 'axios'
import { Toast } from 'vant';

axios.create().defaults.timeout = 2500;
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
    return response;
  }, function (error) {
    if(error.code === 404){
        Toast('页面找不到')
    }
    if(error.code === 500){
        Toast('服务端错误')
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios