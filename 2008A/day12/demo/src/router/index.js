import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: ()=> import('@/views/Index.vue'),
    // 路由重定向 将根路由重定向到主页
    redirect: '/home',
    children:[
      //主页
      {
        path: "/home",
        name: "MyHome",
        meta:{
          name:'首页',
        },
        component: ()=> import('@/views/MyHome.vue'),
      },
      // 个人页
      {
        path: "/my",
        name: "MyPage",
        meta:{
          name:'个人页',
        },
        component: ()=> import('@/views/MyPage.vue'),
      },
    ]
  },
  {
    path: "/login",
    name: "MyLogin",
    component: ()=> import('@/views/MyLogin.vue'),
  },
  // 使用query传参不需要配置路由
  // {
  //   path: "/detail",
  //   name: "MyDetail",
  //   component: ()=> import('@/views/MyDetail.vue'),
  // },
  // 使用params传参需要配置动态路由 因为每一个id都对应一个详情页
  {
    path: "/detail/:id",
    name: "MyDetail",
    component: ()=> import('@/views/MyDetail.vue'),
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 全局前置路由守卫 （导航守卫）
// to 你要前往的路由地址
// from 你从哪个路由地址进行跳转
// next 下一步执行什么 next()继续正常执行  还可以写一个拦截 拦截到哪个路由就写哪个 next('/login')  next({name:"MyLogin"})
router.beforeEach((to,from,next)=>{
  // 获取登录态 如果拿不到 会返回一个null
  let isLogin = localStorage.getItem('logined')
  // 如果没有登录态 并且 访问的页面是个人页
  if(!isLogin && to.path =="/my"){
    // console.log(to, '_______to')
    //在被拦截时 存一下被拦截的页面路由地址
    localStorage.setItem('prevRouter',to.path)
    // 拦截到登录页
    return next('/login')
  }
  // 登陆了 或者你要访问的页面不是个人页 直接放行
  next()
})

export default router;
