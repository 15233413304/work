import Vue from "vue";
import VueRouter from "vue-router";

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
      },
      {
        path: '/address',
        component: ()=> import('@/views/Address/AddressView.vue')
      },
    ]
  },
  {
    path: '/address/detail',
    component: ()=> import('@/views/Address/AddressEdit')
  },
  {
    path: '/login',
    component: ()=> import('@/views/Login/UserLogin.vue')
  },
  {
    path: '/detail',
    component: ()=> import('@/views/Detail/DetailView.vue')
  },
  {
    path:'/admin',
    redirect: '/admint/list',
    component: ()=> import('@/views/Admin/AdminView.vue'),
    children:[
      {
        path: 'list',
        component: ()=> import('@/views/Admin/AdminList.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if(to.path === '/admin' && !sessionStorage.getItem('token')){
        next('/admin/login')
      }else{
        next()
      }
    }
  },
  {
    path:'/admin/login',
    component: ()=> import('@/views/Admin/AdminLogin.vue'),
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


// // 导航守卫(路由守卫)  includes适用于某些页面需要登陆 某些页面不需要登陆就能看到
router.beforeEach((to,form,next)=>{
  // 定义一个白名单，如果路由在白名单内 就不拦截
  const whiteList = ['/admin','/admin/login','/admin/list','/login','/home']
  // 获取登陆状态
  const logined = JSON.parse(localStorage.getItem('vuex'))?.login.isLogin
  if(!whiteList.includes(to.path) && !logined){
    next('/login')
  }else{
    next()
  }
})

// 你不登陆就不让你看页面
// router.beforeEach((to,form,next)=>{
//   // 获取登陆状态
//   // const logined = store.state.login.isLogin
//   const logined = JSON.parse(localStorage.getItem('vuex'))?.login.isLogin
//   // 有核酸 && 没有出入证
//   if(to.path !=='/login' && !logined){
//     // 拦截
//     next('/login')
//   }else{
//     // 有核酸 && 有出入证
//     // 放行
//     next()
//   }
// })

export default router;
