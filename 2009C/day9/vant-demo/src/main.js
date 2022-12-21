import Vue from "vue";
import App from "./App.vue";
// 引入vant ui库
import Vant from 'vant';
// 引入 vant 的样式
import 'vant/lib/index.css';
// 图片懒加载组件
import { Lazyload } from 'vant';

import axios from '@/utils/http'


//使用vant
Vue.use(Vant).use(Lazyload);
// axios挂载到全局中
Vue.prototype.$http = axios
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
