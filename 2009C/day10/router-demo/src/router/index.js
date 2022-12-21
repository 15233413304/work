import Vue from "vue";
import VueRouter from "vue-router";
import Index from '@/views/Index'
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'index',
    component: Index,
    // 嵌套路由 子路由
    children:[
      {
        path:'/home',
        name:'home',
        component: ()=> import('@/views/BaseHome.vue'),
      },
      {
        path:'/class',
        name:'class',
        component: ()=> import('@/views/BaseClassify.vue'),
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
