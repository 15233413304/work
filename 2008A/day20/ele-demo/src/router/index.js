import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: ()=>import('@/views/Index.vue'),
    redirect:'/table',
    children:[
      {
        path: "table",
        name: "Table",
        component: ()=>import('@/views/Home/MyTable.vue'),
      },
      {
        path: "edit",
        name: "UserEdit",
        component: ()=>import('@/views/Home/UserEdit.vue'),
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component: ()=> import('@/views/Login/MyLogin.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫/导航守卫/路由拦截跳转
let whiteList = ['/login']
router.beforeEach((to,from,next)=>{
  // 获取登陆信息
  let token = localStorage.token
  // 如果没有登陆信息 并且 也不在白名单里
  if(!token && !whiteList.includes(to.path)){
    // 拦截到登陆页
    return next('/login')
  }
  // 放行
  next()
})


export default router;
