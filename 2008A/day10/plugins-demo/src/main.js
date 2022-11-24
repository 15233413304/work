import Vue from "vue";
import App from "./App.vue";
// 引入自己封装的插件
import AUI from '@/plugins/index'

Vue.config.productionTip = false;
// 使用插件
Vue.use(AUI)
new Vue({
  render: (h) => h(App),
}).$mount("#app");
