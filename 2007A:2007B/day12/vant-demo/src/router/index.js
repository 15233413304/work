import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    // 根路径  启服务之后的默认路径  0级路由
    path: "/",
    // 路由重定向
    redirect: '/home',
    component: ()=> import("@/views/Index.vue"),
    // children:[ 子路由,子路由,子路由 ]  子路由 {path:'',component}
    children:[
      {
        // 一级路由
        path:'/home',
        component: ()=> import(/* webpackChunkName: "home" */ "@/views/Home/HomeView.vue"),
        redirect:'/home/tab1',
        // 二级路由
        children:[
          {
            path:'/home/tab1',
            component: ()=> import(/* webpackChunkName: "home" */ "@/views/Home/HomeTab1.vue"),
          },
          {
            path:'/home/tab2',
            component: ()=> import(/* webpackChunkName: "home" */ "@/views/Home/HomeTab2.vue"),
          },
          {
            path:'/home/tab3',
            component: ()=> import(/* webpackChunkName: "home" */ "@/views/Home/HomeTab3.vue"),
          },
        ]
      },
      {
        // 一级路由
        path:'/car',
        component: ()=> import("@/views/Car/GouwuCar.vue"),
      },{
        // 一级路由
        path:'/my',
        component: ()=> import( "@/views/My/MyXinxi.vue"),
      },
    ]
  },
  // query传参 不需要动态路由
  // {
  //   path: "/detail",
  //   component: ()=> import("@/views/Detail/DetailView.vue"),
  // }
  // params传参 需要使用动态路由
  {
    path: "/detail/:id/:tab",
    name:'detail',
    component: ()=> import("@/views/Detail/DetailView.vue"),
  }
  
  
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
