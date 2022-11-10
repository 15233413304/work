import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    // 根路由 0级路由
    path: '/',
    component: ()=> import('@/pages/Default.vue'),
    redirect: '/home',
    // 一级路由
    children:[
      {
        // 主页
        path: '/home',
        name: 'Home',
        meta:{
          title: '首页'
        },
        component: ()=> import('@/pages/Home.vue'),
      },
      {
        // 购物车
        path: '/shop',
        name: 'Shop',
        meta:{
          title: '购物车'
        },
        component: ()=> import('@/pages/ShopCar.vue'),
        // 局部路由守卫
        // beforeEnter: (to, from, next) => {
        //     // 获取登陆后的登陆态 如果没有存 null
        //     let logined = localStorage.getItem('logined')
        //     // 没有登陆态 没登陆
        //     if(!logined){
        //       // 拦截到登陆页
        //       return next({name:'Login'})
        //     }
        //     // 放行
        //     next()
        // },
      },
      {
        // 个人页
        path: '/my',
        name: 'My',
        meta:{
          title: '我的主页'
        },
        component: ()=> import('@/pages/My.vue'),
      },
    ]
  },
  {
    // 登陆页
    path:'/login',
    name:'Login',
    component: ()=> import('@/pages/Login.vue')
  },
  // query传参跳详情
  // {
  //   // 详情页
  //   path:'/detail',
  //   name:'Detail',
  //   component: ()=> import('@/pages/Detail.vue')
  // },
  // params 传参跳详情
  {
    // 详情页
    path:'/detail/:tab/:id',
    name:'Detail',
    meta:{
      admin: true
    },
    component: ()=> import('@/pages/Detail.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 全局路由守卫/全局导航守卫 to from next
// to 要跳转的页面地址 
// from 来自于哪个页面
//  next 下一步执行什么操作 next('/path') 拦截到 '/path'路由    next() 放行
// router.beforeEach((to,from,next)=>{
//   // console.log(to)
//   // 如果登陆成功 localStorage会存一个属性叫 logined 
//   let logined = localStorage.getItem('logined')
//   if(!logined && to.path == '/shop'){
    // // 存储一下要跳的页面是哪个
    // localStorage.setItem('backRouter',to.path)
//     // 如果没登陆 并且要跳转的页面时购物车 就拦截到登陆页面
//     return next('/login')
//   }
//   // // 如果登陆了 就直接放行
//   next()
// })

router.beforeEach((to,from,next)=>{
  // 定义一个白名单，如果路由在白名单内 就不拦截
  let WhiteList = ['/home','/login','Detail']
  let logined = localStorage.getItem('logined')
  // 如果用户没有登陆 并且 不在白名单内 那么拦截到登陆页
  if(!logined && !WhiteList.includes(to.path) && !to.meta.admin){
    console.log(to)
    // next('/login')
    // 存储一下要跳的页面是哪个
    localStorage.setItem('backRouter',to.path)
    return next({name: 'Login'})
  }
  next()
}) 



  

export default router;
