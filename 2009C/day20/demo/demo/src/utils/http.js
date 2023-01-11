import axios from "axios";
import Router from '@/router/index'
import { Toast } from 'vant'
axios.defaults.timeout = 3000

axios.interceptors.request.use((config)=>{
    // 请求拦截器

    return config
},(error)=>{

    return Promise.reject(error)
})

axios.interceptors.response.use((response)=>{
    return response.data;
},(error)=>{
    // 判断客户端网络是否正常
    if((!window.navigator.onLine) || error && error.code == "ERR_NETWORK"){
        // console.log(Router,'Router')
        // 存一下没网络时的路由路径
        localStorage.setItem('onlineRouter',Router.currentRoute.path)
        // 跳转到无网络的页面
        Router.push('/outline')
        return Toast.fail('网络错误,请检查设备网络是否正常')
    }
    // 状态码判断
    if(error?.message.includes('404')){
        return Toast.fail('前端接口请求路径错误，请联系前端开发人员')
    }
    if(error?.message.includes('500')){
        return Toast.fail('服务器错误，请联系后端开发人员')
    }
    return Promise.reject(error)
})

export default axios;