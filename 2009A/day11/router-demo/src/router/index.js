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
        // 路由视图组件 路由懒加载
        component: ()=> import('@/views/BaseHome.vue'),
      },
      {
        // 路由地址
        path: "class",
        // 路由名称
        name: "class",
        // 路由视图组件 路由懒加载
        component: ()=> import('@/views/BaseClassify.vue'),
      }
    ]
  },
  // 详情页
  // query传参不需要动态路由。
  // {
  //   path: '/detail',
  //   name: 'detail',
  //   component: ()=> import('@/views/BaseDetail.vue')
  // }
  // params传参需要动态路由
  {
    path: '/detail/:id',
    name: 'detail',
    component: ()=> import('@/views/BaseDetail.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
