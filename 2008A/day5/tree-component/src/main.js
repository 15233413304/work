import Vue from "vue";
import App from "./App.vue";
import TreeComponent from '@/components/TreeComponent.vue'
Vue.config.productionTip = false;

Vue.component('TreeComponent',TreeComponent)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
