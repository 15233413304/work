import Vue from "vue";
import App from "./App.vue";
// 引入vant-ui库
import Vant from 'vant';
// 引入vant-ui库的样式
import 'vant/lib/index.css';
// 使用vant-ui库
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
