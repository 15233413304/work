import axios from "axios";
import Router from '@/router/index'
import { Toast } from 'vant'
axios.defaults.timeout = 3000
axios.interceptors.request.use(config=>{
    // console.log(config)
    let token = localStorage.token
    if(token && token> (+new Date() - 3600 * 1000)){
        //有token 并且没有过期 请求头携带token
        config.headers.Authorization = token
    }else{
        Toast.fail('用户信息已过期，请重新登陆')
        // 如果token过期了 或者没有token 先清理token（已过期）
        localStorage.removeItem('token')
        //重新登陆
        Router.push('/login')
    }
   return config
},error=>{
    return Promise.reject(error)
})

axios.interceptors.response.use(response=>{
    return response.data;
},error=>{
    //错误码判断
    if(error?.message.includes('404')){
        return Toast.fail('请求路径错误,请联系开发人员')
    }
    if(error?.message.includes('500')){
        return Toast.fail('服务器错误,请联系开发人员')
    }
    // 判断当前设备是否无网络 网络不好时 弹出友好提示
    if(window.navigator.onLine || error?.code == "ERR_NETWORK"){
        console.log(error)
        // console.log(Router,'router')
        // 无网络时将当前页面存到本地存储中 以便有网络时返回
       localStorage.setItem('online',Router.currentRoute.path)
       Router.replace('/outline')
       return Toast.fail('网络错误，请检查网络')
    }
    return Promise.reject(error)
})

export default axios;
