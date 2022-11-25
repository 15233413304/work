import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    redirect: '/home',  // 重定向:重新指向其它path,会改变网址
    // 子路由
    children:[
      // 主页
      {
        path: "/home",
        name: "Home",
        component: () => import( "../views/HomeView.vue"),
      },
      // 购物车
      {
        path: "/shop",
        name: "ShopCar",
        component: () => import( "../views/ShopCar.vue"),
      },
    ]
  },
  {
    path:'/detail/:id',
    name:"Detail",
    component: () => import("../views/MyDetail.vue"),
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
