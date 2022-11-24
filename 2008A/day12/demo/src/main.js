import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from '@/utils/http'
import { Lazyload } from 'vant';

Vue.use(Vant).use(Lazyload);
// 讲axios 挂载到vue全局中 在页面中可以使用this.$axios()  来使用axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
