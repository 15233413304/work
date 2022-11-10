import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入vant-ui库
import Vant from 'vant';
// 引入vant-ui库组件的样式
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

// 全局使用vant组件
Vue.use(Vant).use(Lazyload)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
