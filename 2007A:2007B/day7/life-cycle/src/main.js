import Vue from "vue";
import App from "./App.vue";
// 引入一个公用组件 比如标题
import Common from '@/components/Common.vue'
Vue.config.productionTip = false;
// 全局注册组件
Vue.component('PublicCompon',Common)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
