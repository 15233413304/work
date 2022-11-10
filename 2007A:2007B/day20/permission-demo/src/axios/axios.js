import axios from "axios";
import { Message } from 'element-ui';
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
    if(response.data?.code == 400){
        Message.error(response.data.message);
    }
    if(response.data?.code == 200){
        Message.success(response.data.message)
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    if(error){
        Message.error('网络不太好，重试一下吧');
    }
    return Promise.reject(error);
  });

  export default axios