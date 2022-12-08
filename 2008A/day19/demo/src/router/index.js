import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import OutLine from '@/views/OutLine.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    redirect:'/home',
    children:[
      {
        path:'home',
        name:'Home',
        component: ()=> import('@/views/HomeView.vue'),
        meta:{
          keepAlive: true
        }
      },
      {
        path:'shop',
        name:'Shop',
        component: ()=> import('@/views/ShopCar.vue')
      },
      {
        path:'my',
        name:'My',
        component: ()=> import('@/views/MyView.vue'),
        // 局部路由守卫 局部导航守卫
        // beforeEnter: (to, from, next) => {
        //   const token = localStorage.token
        //   if(!token){
        //    localStorage.setItem('backRouter',to.path)
        //    return next('/login')
        //   }
        //   next()
        // }
      },
      {
        path:'address',
        name:'Address',
        component: ()=> import('@/views/AddressView.vue')
      },
      {
        path: 'outline',
        name: 'OutLine',
        component: OutLine
      },
      {
        path:'search',
        name:'SearchDetail',
        component: ()=> import('@/views/SearchDetail.vue')
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: ()=> import('@/views/LoginView.vue'),
  },
  {
    // 用params 传参 需要配置动态路由地址
    path: "/detail/:tab/:id",
    name: "Detail",
    component: ()=> import('@/views/ShopDetail.vue'),
  },
  {
    // 用params 传参 需要配置动态路由地址
    path: "/address/edit",
    name: "AddressEidt",
    component: ()=> import('@/views/AddressEidt.vue'),
  },
  {
    path:'/404',
    component: ()=> import('@/views/404Page.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由白名单 哪些路由不需要拦截就写在里面 一定要写上login页面 不然会递归报错 (超出最大栈堆调用)
// 如果跳转详情页 不可以用path做拦截 因为详情页路由是动态生成的 有多少种详情就有多少种详情路由
// 要使用to.name判断详情页的路由name属性
let whiteList = ['/login','/home','Detail','/outline','/404']
router.beforeEach((to,from,next)=>{
  // 判断跳转的地址存不存在
  if(!to.matched.length){
    next('/404')
  }
  const token = localStorage.token
  // 如果没有登陆 并且 不在白名单内 就拦截
  if(!token && !whiteList.includes(to.path) && !whiteList.includes(to.name)){
    localStorage.setItem('backRouter',to.path)
    return next('/login')
  }
  next()
})

export default router;
