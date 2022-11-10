import Vue from "vue";
import VueRouter from "vue-router";
// import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/index'
  },
  {
    path: "/index",
    component: () => import('@/views/index.vue'),
    children:[
      {
        path: '/home',
        component: ()=> import('@/views/Home/HomeView.vue')
      },
      {
        path: '/shop',
        component: ()=> import('@/views/Shop/ShopView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: ()=> import('@/views/Login/UserLogin.vue')
  },
  {
    path: '/detail',
    component: ()=> import('@/views/DetailView.vue')
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


// // 导航守卫(路由守卫)  includes适用于某些页面需要登陆 某些页面不需要登陆就能看到
// router.beforeEach((to,form,next)=>{
//   // 定义一个拦截名单，如果路由在拦截名单内 就拦截
//   const routerList = ['/home']
//   // 获取登陆状态
//   const logined = store.state.login.isLogin
//   // 有核酸 && 没有出入证
//   if(routerList.includes(to.path) && !logined){
//     // 拦截
//     next('/login')
//   }else{
//     // 有核酸 && 有出入证
//     // 放行
//     next()
//   }
// })

// 你不登陆就不让你看页面
router.beforeEach((to,form,next)=>{
  // 获取登陆状态
  // const logined = store.state.login.isLogin
  const logined = JSON.parse(localStorage.getItem('vuex'))?.login.isLogin
  // 有核酸 && 没有出入证
  if(to.path !=='/login' && !logined){
    // 拦截
    next('/login')
  }else{
    // 有核酸 && 有出入证
    // 放行
    next()
  }
})

export default router;
