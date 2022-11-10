import axios from "axios"
import { Toast } from 'vant'
var instance = axios.create();

// 设置超时时间
instance.defaults.timeout = 2500;

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    if(error){
        Toast('网络不太好');
    }
    return Promise.reject(error);
  });

export default axios