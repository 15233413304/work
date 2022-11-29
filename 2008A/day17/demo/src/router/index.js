import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

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
        path:'my',
        name:'My',
        component: ()=> import('@/views/MyView.vue'),
        // 局部路由守卫 局部导航守卫
        beforeEnter: (to, from, next) => {
          const token = localStorage.token
          if(!token){
           localStorage.setItem('backRouter',to.path)
           return next('/login')
          }
          next()
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: ()=> import('@/views/LoginView.vue'),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// let whiteList = ['/login','/home']
// router.beforeEach((to,from,next)=>{
//   const token = localStorage.token
//   // 如果没有登陆 并且 不在白名单内 就拦截
//   if(!token && !whiteList.includes(to.path)){
//     localStorage.setItem('backRouter',to.path)
//     return next('/login')
//   }
//   next()
// })

export default router;
