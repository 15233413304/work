import Vue from "vue";
import App from "./App.vue";
import SteamUI from '@/plugins/index'

Vue.use(SteamUI)
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
