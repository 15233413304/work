import Vue from "vue";
import App from "./App.vue";
// 引入饿了么组件ui库
import ElementUI from 'element-ui';
// 引入饿了么组件ui库的样式
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/utils/http'

// 全局使用element库
Vue.use(ElementUI);
// 定一个全局方法 通过this.$http 就可以使用axios
Vue.prototype.$http = axios
// 使用eventBus
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");