import Vue from "vue";
import VueRouter from "vue-router";
import Index from '@/views/Index.vue'

Vue.use(VueRouter);
// 路由表
const routes = [
  {
    // 路由路径
    path:'/',
    // 路由名
    name:'index',
    component: Index,
    // 嵌套路由 子路由
    children:[
      {
        // 路由路径
        path:'/home',
        // 路由名
        name:'home',
        component: ()=> import('@/views/BaseHome.vue'),
      },
      {
        // 路由路径
        path:'/class',
        // 路由名
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
