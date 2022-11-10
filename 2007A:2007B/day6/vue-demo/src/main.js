import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
Vue.component('nav-bar',{
  props:['title'],
  template: '<div>{{title}}</div>'
})

// Vue.component('shop-card',{
//   props:{
//     goods:{
//         // 类型
//         type: Array,
//         // 默认值
//         default(){
//             return []
//         }
//     }
//   },
//   methods:{
//     clickAdd(id){
//         // 子组件通知父组件执行一个自定义事件
//         // 第一个参数是自定义事件名 用""引号包裹（你想起什么就起什么）
//         // 第二个参数（可选）传过去的数据
//         this.$emit('add',id)
//     },
//     clickSub(id){
//         this.$emit('sub',id)
//     }
//   },
//   template: `<div>
//     <div v-for="item in goods" :key="item.id">
//     <h3>商品名：{{item.title}}</h3>
//     <p>价格：{{item.price}}</p>
//     <img :src="item.img" alt="">
//     <p>
//         <button @click="clickAdd(item.id)">+</button>
//         数量：{{item.count}}
//         <button @click="clickSub(item.id)">-</button>
//     </p>
//     </div>
//   </div>`
// })

new Vue({
  render: (h) => h(App),
}).$mount("#app");
