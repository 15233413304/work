import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component: ()=> import('@/views/Index.vue'),
    redirect:'/user',
    children:[
      {
        path:"user", 
        component: ()=> import('@/views/UserList.vue')
      },
      {
        path:"my",
        component: ()=> import('@/views/MyInfo.vue')
      }
    ]
  },
  {
    path:"/login",
    component: ()=> import('@/views/Login.vue')
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// const whiteList = ['/login','/user']
// router.beforeEach((to,from,next)=>{
//   let token = localStorage.getItem('token')   //如果没登陆 就是null  登陆了那就是登陆存的值
//   if(!token && !whiteList.includes(to.path)){
//     // 存储登陆前要跳转到哪个页
//     localStorage.setItem('currentPage',to.path)
//     // 如果没登陆 并且不在白名单内 那就拦截到登陆页
//     return next('/login')
//   }
//   next()
// })

// 访问的白名单, 可以直接通行
const whiteList = ['/login','/user']
router.beforeEach((to, from, next) => {
  // 访问的路径在白名单
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      localStorage.setItem('abc',to.path)
      next('/login')
    }
  }
})




export default router;
