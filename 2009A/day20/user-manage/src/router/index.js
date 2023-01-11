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
        component:()=> import('@/views/HomeView.vue')
      },
      {
        path:'edit',
        name:'edit',
        component:()=> import('@/views/EditUser.vue')
      },
     
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=> import('@/views/LoginView.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 拦截的白名单
let WhiteList = ['/login']
// 路由全局导航前置守卫
router.beforeEach((to,from,next)=>{
  let token = localStorage.token
  if(!token && !WhiteList.includes(to.path)){
    return next('/login')
  }
  next()
})

export default router;
