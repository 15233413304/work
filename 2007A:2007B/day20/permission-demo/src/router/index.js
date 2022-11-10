import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: ()=> import('@/views/Index.vue'),
    redirect: '/home',
    children:[
      {
        // 首页
        path:'/home',
        component: ()=> import('@/views/HomeView.vue')
      },
      {
        // 角色管理
        path:'/role',
        component: ()=> import('@/views/RoleView.vue')
      },
      {
        // 配置管理
        path:'/config',
        component: ()=> import('@/views/ConfigView.vue')
      },
    ]
  },
  {
    path:'/login',
    component: ()=> import('@/views/LoginView.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const WhiteList = ['/login','/home','/config']
router.beforeEach((to,from,next)=>{
  // 登陆成功后会存一个token 用于判断用户是否登陆
  if(!localStorage.getItem('token') && !WhiteList.includes(to.path)){
    // 如果 没登陆 并且 白名单里还没有这个页面 那就拦截 强制你去登陆
    return next('/login')
  }
  // 登陆了 或者 在白名单里 放行
  next()
})

export default router;
