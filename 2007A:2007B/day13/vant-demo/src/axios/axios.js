import axios from 'axios'

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
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios