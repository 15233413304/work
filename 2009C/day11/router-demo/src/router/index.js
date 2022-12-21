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
        // 路由懒加载
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: "class",
        name: "class",
        component: () => import('@/views/BaseClassify.vue')
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
