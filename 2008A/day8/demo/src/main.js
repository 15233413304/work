import Vue from "vue";
import App from "./App.vue";
import mountFn from '@/utils/extend'
// 使用动态创建组件
Vue.use(mountFn)
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
