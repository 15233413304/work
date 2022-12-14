// npm i vue -S
import Vue from 'vue';
import App from './App.vue'

import './index.css'
import './index.scss'
import './assets/1.webp'
import './assets/2.webp'

new Vue({
    // el:'#app',
    render: h => h(App)
}).$mount('#app')