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
        component: ()=> import('@/views/HomeView.vue')
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

let whiteList = ['/login','/home','Detail','/outline','/404']
router.beforeEach((to,from,next)=>{
  // console.log(to)
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
