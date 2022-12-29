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
    return Promise.reject(error)
})

export default axios;
