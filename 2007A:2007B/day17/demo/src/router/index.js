import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import(/* webpackChunkName: "index" */ "@/views/Index.vue"),
    // 路由重定向 将跟路径重定向到主页
    redirect:'/home',
    // 子路由 嵌套路由
    children:[
      {
        // 主页
        path: "/home",
        name: "Home",
        // 路由元信息
        meta:{
          nav: '主页'
        },
        component: () => import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
      },
      {
        //地址
        path: "/address",
        name: "Address",
        meta:{
          nav: '地址管理'
        },
        component: () => import(/* webpackChunkName: "home" */ "@/views/AddressView.vue"),
      }
    ]
  },
  {
    path:'/edit',
    component: ()=> import('@/views/EditAddress.vue')
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
