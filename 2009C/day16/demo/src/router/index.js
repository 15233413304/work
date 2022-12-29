import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    // 路由重定向 当访问路径是跟路径时 重定向到主页
    redirect:'/home',
    // 嵌套路由
    children:[
      {
        path:'home',
        name:'home',
        meta:{
          title:'主页'
        },
        component: ()=>import("@/views/HomeView.vue")
      },
      {
        path:'shop',
        name:'shop',
        meta:{
          title:'购物车'
        },
        component: ()=>import("@/views/ShopCart.vue")
      },
      {
        path:'address',
        name:'address',
        meta:{
          title:'收货地址'
        },
        component: ()=>import("@/views/AddressView.vue")
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      title:"登陆页"
    },
    component: ()=> import('@/views/LoginView.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta:{
      title:"商品详情"
    },
    component: ()=> import('@/views/DetailView.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let WhiteList = ['/login','/home']
// 全局路由前置守卫
router.beforeEach((to,from,next)=>{
  let token = localStorage.token
  // 判断 如果没有登陆 并且 不在白名单内 拦截到登陆页
  if(!token && !WhiteList.includes(to.path)){
    // 存储一下被拦截的路由地址
    localStorage.setItem('RouterPath',to.path)
    return next('/login')
  }
  // 登陆了 或者是白名单内的路由 直接放行
  next()
})

export default router;
