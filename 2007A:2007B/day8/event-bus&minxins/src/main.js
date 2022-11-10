import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// 挂载一个全局的事件通信函数
Vue.prototype.$eventBus = new Vue()

new Vue({
  render: (h) => h(App),
}).$mount("#app");
