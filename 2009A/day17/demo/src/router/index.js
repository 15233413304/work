import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    // 路由重定向 当访问路由路径是根路径时重定向到/home主页
    redirect:'/home',
    // 嵌套路由
    children:[
        {
          path: "home",
          name: "home",
          meta:{
            title:'主页',
            keepAlive:true,
            position:0,
          },
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          meta:{
            title:'购物车'
          },
          component: () => import("@/views/ShopCart.vue"),
        },
        {
          path: "address",
          name: "address",
          meta:{
            title:'收获地址'
          },
          component: () => import("@/views/AddressView.vue"),
        },    
    ]
  },
  {
    path: "/login",
    name: "login",
    meta:{
      title:'登陆'
    },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    // 详情页params传参 需要动态设置路由参数
    path: "/detail/:id",
    name: "detail",
    meta:{
      title:'商品详情'
    },
    component: () => import("@/views/DetailView.vue"),
  },
  {
    path: '/create/address',
    name: 'createAddress',
    meta:{
      title:'新增地址'
    },
    component: () => import("@/views/CreateAddress.vue"), 
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    console.log(to,savedPosition)
    return savedPosition || { x: 0, y: 0 }
  }
});

//白名单：哪些路由不被拦截 必须有登陆页 不然登陆自己跳自己 死循环 会超出最大栈堆调用
let WhiteList = ['/login','/home']
// 全局路由前置导航守卫
router.beforeEach((to,from,next)=>{
  // 假设登陆后会有一个token
  let token = localStorage.token
  // 判断 如果没有登陆 并且白名单不包含这个路由地址 拦截到登陆页
  if(!token && !WhiteList.includes(to.path)){
    // 存储一下被拦截的路径 如果登陆完毕 还要跳转过来
    localStorage.setItem('RouterPath',to.path)
    return next('/login')
  }
  // 如果逻辑走到这里了 说明至少登陆了 或者 在白名单中 直接放行
  next()
})

export default router;
