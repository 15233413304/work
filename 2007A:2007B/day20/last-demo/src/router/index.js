import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    //根路由
    path: "/",
    name: "Index",
    component: ()=> import('@/views/Index.vue'),
    // 重定向
    redirect: '/home',  // 重定向:重新指向其它path,会改变网址
    children:[
      {
        path: "home",
        name: "Home",
        meta:{
          title:'首页'
        },
        component: ()=> import('@/views/HomeView.vue'),
      },
      {
        path: "shop",
        name: "Shop",
        meta:{
          title:'购物车'
        },
        component: ()=> import('@/views/ShopView.vue'),
      },
      {
        path: "address",
        name: "Address",
        meta:{
          title:'地址'
        },
        component: ()=> import('@/views/AddressView.vue'),
      },
      {
        path: "my",
        name: "My",
        meta:{
          title:'我的'
        },
        component: ()=> import('@/views/MyView.vue'),
      },
    ]
  },
  {
    // 详情页
    path:'/detail/:id',
    name: "Detail",
    component: ()=> import('@/views/DetailView.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
