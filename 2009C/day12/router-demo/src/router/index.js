import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    // 路由重定向
    redirect:'/index'
  },
  {
    // 路由地址 路由的路径
    path: "/index",
    // 路由名称
    name: "index",
    // 路由对应的视图组件
    component: Index,
    //路由重定向
    redirect:{name:'home'}, 
    // 嵌套路由 子路由 子路由中的path 如果以/ 开头 那就是路径名 如果不带/会自动继承父路由的路径名
    children:[
      {
        path: "home",
        name: "home",
        // 路由元信息
        meta:{
          title:'首页'
        },
        // 路由懒加载
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: "class",
        name: "class",
        meta:{
          title:"分类"
        },
        component: () => import('@/views/BaseClassify.vue')
      },
      {
        path: "my",
        name: "my",
        meta:{
          title:"我的"
        },
        component: () => import('@/views/BaseMy.vue')
      },
    ]
  },
  // 详情页 
  // {
  //   path:'/detail',
  //   name:'detail',
  //   component:()=> import('@/views/BaseDetail.vue')
  // }
  // 动态路由传参 params
  {
    path:'/detail/:id',
    name:'detail',
    component:()=> import('@/views/BaseDetail.vue')
  },
  {
    path:'/login',
    component:()=> import('@/views/UserLogin.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


// 全局 路由前置守卫 / 导航守卫
// to 即将前往的页面地址 （要去哪）
// from 从哪个地址跳转过来的 (来自哪)
// next 下一步要执行什么？ （拦截或放行）
// next() 表示不做处理 放行  next('/路由路径') 将当前要跳转的路由拦截到某个路由页

// 定义一个白名单 如果跳转的路由路径在白名单中将不会被拦截
let WhiteList = ['/login','/index/home','/index/class']
router.beforeEach((to,from,next)=>{
  console.log(to)
  // 获取登陆状态
  let logined = localStorage.logined
  if(!logined && !WhiteList.includes(to.path)){
    // 既没有登陆 也不在白名单内 那就拦截到登陆页 让用户登陆
    // 存储一下 被拦截的页面路由地址 登陆成功后还需要返回这个页面
    localStorage.setItem('RouterPath',to.path)
    // 拦截到登陆
    return next('/login')
  }
  next()
})

export default router;
