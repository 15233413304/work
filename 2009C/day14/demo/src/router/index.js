import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    redirect:'/home',
    children:[
      {
        path:'home',
        name:'home',
        meta:{
          title:'首页'
        },
        component:()=> import('@/views/HomeView.vue')
      },
      {
        path:'my',
        name:'my',
        meta:{
          title:'我的'
        },
        component:()=> import('@/views/MyView.vue')
      },
      {
        path:'cart',
        name:'cart',
        meta:{
          title:'购物车'
        },
        component:()=> import('@/views/ShopCart.vue')
      }
    ]
  },
  {
    path:'/login',
    component:()=> import('@/views/UserLogin.vue')
  },
  {
    path:'/qrlogin',
    component:()=> import('@/views/QrLogin.vue')
  },
  {
    path:'/detail/:id',
    name:'detail',
    component: ()=> import('@/views/DetailView.vue')
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let WhiteList = ['/login','/home','/qrlogin']
// 路由全局前置导航守卫
router.beforeEach((to,from,next)=>{
  let logined = localStorage.logined
  if(!logined && !WhiteList.includes(to.path)){
    // 存一下被拦截的路由地址
    localStorage.setItem('RouterPath',to.path)
    return next('/login')
  }
  next()
})

export default router;
