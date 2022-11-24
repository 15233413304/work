import Vue from 'vue';
// 引入 element-ui
import ElementUI from 'element-ui';
// 引入element-ui的 css样式
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from '@/utils/http'
// 使用element
Vue.use(ElementUI);
// 将axios 挂载到全局中
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  render: h => h(App)
});