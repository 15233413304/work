import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/Home/Home.vue'),
    redirect: '/home/list',
    children:[
        {
          path:'list',
          component: () => import('../views/Home/HomeList.vue')
        },
        {
          path:'a',
          component: () => import('../views/Home/HomeA.vue')
        },
        {
          path:'b',
          component: () => import('../views/Home/HomeB.vue')
        }
    ]
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next)=>{
  const logined = JSON.parse(localStorage.getItem('vuex'))['isLogin']
  
  console.log(logined)
  if(to.path !== '/login' && !logined){
    next('/login')
  }else{
    next()
  }
})

export default router;
