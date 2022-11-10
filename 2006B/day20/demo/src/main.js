import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vant).use(Lazyload).use(ElementUI);

Vue.config.productionTip = false;

import hasPermission from '@/utils/permission'

Vue.directive('permission',{
  inserted(el,binding){
    if(!hasPermission(binding.value)){
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
