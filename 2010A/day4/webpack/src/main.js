import Vue from 'vue'
import App from './App.vue'
import './index.css'
import './index.scss'
import './assets/a.webp'
import './assets/b.webp'

new Vue({
    // el:'#app',
    render: h=> h(App)
}).$mount('#app')