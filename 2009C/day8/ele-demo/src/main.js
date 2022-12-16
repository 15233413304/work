import Vue from "vue";
import App from "./App.vue";
// 引入饿了么ui库
import ElementUI from "element-ui";
// 引入饿了么ui库的样式
import "element-ui/lib/theme-chalk/index.css";
import axios from "@/utils/http";

// 使用ElementUI
Vue.use(ElementUI);
// 在全局上挂载axios  this.$http 就相当于 axios
Vue.prototype.$http = axios;
// 使用eventBus
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
