import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// 设置一个全局通信函数 名为$bus  this.$bus
Vue.prototype.$bus = new Vue()

new Vue({
  render: (h) => h(App),
}).$mount("#app");
