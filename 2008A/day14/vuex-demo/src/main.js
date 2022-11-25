import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入vuex仓库
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from '@/utils/http'

Vue.use(Vant);
Vue.config.productionTip = false;
// 把axios挂载到全局中 在页面通过this.$axios() 调用
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
