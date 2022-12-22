import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from "@/utils/http";
import { Lazyload } from 'vant' 
import NavBar from '@/components/NavBar.vue'

Vue.component('NavBar',NavBar)
Vue.use(Vant).use(Lazyload);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
