import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from '@/utils/http'
import { Lazyload } from 'vant'

Vue.use(Lazyload)
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
