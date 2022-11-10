import Vue from "vue";
import App from "./App.vue";
// 从 element-ui 中引入ElementUI 组件库
import ElementUI from 'element-ui';
// 引入组件的样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入添加成功提示组件
import Toast from '@/components/Toast.vue'

import mountFn from '@/utils/Toast'

Vue.component('Success',Toast)
Vue.config.productionTip = false;
Vue.use(ElementUI).use(mountFn)
Vue.prototype.$bus = new Vue()   

new Vue({
  render: (h) => h(App),
}).$mount("#app");