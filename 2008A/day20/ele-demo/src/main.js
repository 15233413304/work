import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  BreadLayout from '@/components/BreadLayout.vue'

Vue.use(ElementUI);
// 全局注册面包屑组件
Vue.component('bread-layout',BreadLayout)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
