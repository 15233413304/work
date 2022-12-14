import Vue from "vue";
import App from "./App.vue";

// 引入组件
import BaseBanner from '@/components/BaseBanner'
// 全局注册组件
Vue.component('BaseBanner',BaseBanner)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
