import Vue from "vue";
import App from "./App.vue";
// 引入组件
import TheChildren from '@/components/TheChildren.vue'
Vue.config.productionTip = false;
// 全局注册组件
Vue.component('TheChildren',TheChildren)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
