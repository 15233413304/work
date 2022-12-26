import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    redirect:'/home',
    children:[
      {
        path: "home",
        name: "home",
        meta:{
          title:'主页'
        },
        component: ()=> import('@/views/HomeView.vue'), 
      },
      {
        path: 'cart',
        name: 'cart',
        meta:{
          title:'购物车'
        },
        component: ()=> import('@/views/CartView.vue'), 
      }
    ]
  },
  // 详情页 params传参 需要动态路由
  {
    path:'/detail/:tab/:id',
    name:'detail',
    component: ()=> import('@/views/DetailView.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
