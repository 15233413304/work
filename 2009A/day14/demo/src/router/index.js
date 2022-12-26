import Vue from "vue";
import VueRouter from "vue-router";
import Index from '@/views/Index.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    redirect:'/home',
    children:[
      {
        path: '/home',
        meta:{
          title:'主页'
        },
        component:()=> import('@/views/HomeView.vue')
      },
      {
        path: '/my',
        meta:{
          title:'我的'
        },
        component:()=> import('@/views/MyView.vue')
      },
      {
        path:'/cart',
        meta:{
          title:'购物车'
        },
        component:()=> import('@/views/CartView.vue')
      }
    ]
  },
  {
    path:'/login',
    component: ()=> import('@/views/UserLogin.vue')
  },
  {
    path:'/qrlogin',
    component: ()=> import('@/views/QrLogin.vue')
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
let whiteList = ['/login','/qrlogin','/home']
router.beforeEach((to,from,next)=>{
  let logined = localStorage.logined
  if(!logined && !whiteList.includes(to.path)){
    localStorage.setItem('RouterPath',to.path)
    return next('/login')
  }
  next()
})

export default router;
