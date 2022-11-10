<template>
  <div id="app">
    <HelloWorld/>
    {{childName}}
    <button @click="sendMoney">祖父给孙子零花钱</button>
    祖父的钱包:{{Money}}
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import  Event from '@/minxins/EventFn'
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  // vue 提供一个minxins 混入方法
  mixins:[Event],
  data(){
    return{
      childName:'',
      Money: 50000,
    }
  },
  methods:{
    // sendMoney(){
    //   // 给孙子来点零花钱
    //   this.$eventBus.$emit('Money',5000)
    //   this.Money -= 5000
    // }
  },
  mounted(){
    // 使用全局通信函数提供的$on方法 接收到 全局通信函数的$emit 派发的事件函数
    this.$eventBus.$on('Name', data =>{
      this.childName = data
    })
  }
};
</script>

<style lang="scss">

</style>
