import axios from "axios";
import { Toast } from 'vant'
import Router from '@/router/index'
var instance = axios.create();
//所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.token
    token && (config.headers.Authorization = token)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 判断客户端是否有网络 无网络时 弹出提示
    if((!window.navigator.onLine)||(error && error.code == "ERR_NETWORK")){
      localStorage.setItem('onlineRouter',Router.currentRoute.path)
      Router.push('/outline')
      return Toast.fail('网络错误,请检查网络')
    }
    // 对响应错误做点什么
    if(error && error.message.includes('404')){
      return Toast.fail('请求路径错误,请联系开发人员')
    }
    if(error && error.message.includes('500')){
      return Toast.fail('服务器错误,请联系开发人员')
    }
    return Promise.reject(error);
  });
export default axios;