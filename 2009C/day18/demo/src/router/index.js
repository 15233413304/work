import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import OutLine from "../views/OutLine.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    // 路由重定向
    redirect:'/home',
    // 子路由 嵌套路由
    children:[
      {
        path: 'home',
        name: 'home',
        // 路由元信息
        meta:{
          title:'主页'
        },
        component: ()=> import('@/views/HomeView.vue')
      },
      {
        path: 'my',
        name: 'my',
        // 路由元信息
        meta:{
          title:'个人'
        },
        component: ()=> import('@/views/MyView.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        meta:{
          title:'购物'
        },
        component: ()=> import('@/views/ShopCart.vue')
      },
      {
        path: 'address',
        name: 'address',
        meta:{
          title:'地址'
        },
        component: ()=> import('@/views/addressView.vue')
      },
    ]
  },
  {
    //网络错误页面 不使用懒加载
    path: '/outline',
    name:'outline',
    component: OutLine,
  },
  {
    //404页面
    path: '/404',
    name:'404',
    component: ()=> import('@/views/404View.vue'),
  },
  {
    //登陆页
    path:'/login',
    name: 'login',
    component: ()=> import('@/views/LoginView.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 配置一个路由白名单 这些路由不会被拦截
let WhiteList = ['/home','/login','/outline','/404']
// 全局路由前置导航守卫
router.beforeEach((to,from,next)=>{
  let token = localStorage.token
  // 判断跳转的地址是否存在
  if(!to.matched.length){
    // 如果路由的规则不存在 那么说明路由地址错误
    next('/404')
  }
  if(!token && !WhiteList.includes(to.path)){
    localStorage.setItem('RouterPath',to.path)
    next('/login')
  }
  next()
})

export default router;
