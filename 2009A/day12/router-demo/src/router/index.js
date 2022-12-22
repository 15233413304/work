import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    // 路由地址
    path: "/",
    // 路由名称
    name: "index",
    // 路由视图组件
    component: Index,
    // 路由重定向
    redirect:'/home',
    // 嵌套路由 子路由 子路由里的path 如果不以 / 开头 会默认继承父路由的路径
    children:[
      {
        // 路由地址
        path: "home",
        // 路由名称
        name: "home",
        // 路由元信息
        meta:{
          title:'主页'
        },
        // 路由视图组件 路由懒加载
        component: ()=> import('@/views/BaseHome.vue'),
      },
      {
        // 路由地址
        path: "class",
        // 路由名称
        name: "class",
        meta:{
          title:'分类'
        },
        // 路由视图组件 路由懒加载
        component: ()=> import('@/views/BaseClassify.vue'),
      },
      {
        // 路由地址
        path: "my",
        // 路由名称
        name: "my",
        meta:{
          title:"我的"
        },
        // 路由视图组件 路由懒加载
        component: ()=> import('@/views/BaseMy.vue'),
      },
    ]
  },
  // 详情页
  // query传参不需要动态路由。
  // {
  //   path: '/detail',
  //   name: 'detail',
  //   component: ()=> import('@/views/BaseDetail.vue')
  // }
  // params传参需要配置动态路由  通过 /:属性的命名
  {
    path: '/detail/:id',
    name: 'detail',
    component: ()=> import('@/views/BaseDetail.vue')
  },
  // 登陆页
  {
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/BaseLogin.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 全局路由守卫 / 导航守卫
//  to 你即将要访问的路由地址是哪 （要去哪）
//  from 你现在这个路由是来自哪个路由跳转来的 （来源于哪里）
//  next 下一步要做什么   next() 正常执行 不做额外处理  next('/路由地址') 拦截到这个路由页

let WhiteList = ['/login','/home','/class']
router.beforeEach((to,from,next)=>{
  // console.log(to)
  let logined = localStorage.logined
  if(!logined && !WhiteList.includes(to.path)){
    // 判断了一下 登陆状态和白名单 如果既没有登陆又不在白名单 就拦截到登陆页
    // 存一下被拦截的路由地址  登陆成功后还需要跳回这个地址
    localStorage.setItem('RouterPath',to.path)
    return next('/login')
  }
  next()
})

export default router;
