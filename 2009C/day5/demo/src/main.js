import Vue from "vue";
import App from "./App.vue";
// 引入组件
import HelloWorld from '@/components/HelloWorld.vue'
// 全局注册组件 （可以在任何组件中使用）
Vue.component('HelloWorld',HelloWorld)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
