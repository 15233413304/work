import Vue from "vue";
import App from "./App.vue";
// 引入vant ui库
import Vant from 'vant';
// 引入vant ui的样式 
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import axios from '@/utils/http'
// 使用vant
Vue.use(Vant).use(Lazyload);

// 将axios挂载到全局
Vue.prototype.$http = axios
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");


