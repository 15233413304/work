<template>
  <div>
    <Parent/>
    <button @click="changeMsg">点击改变message</button>
    <button @click="changeName">点击改变name</button>
    <button @click="sendEvent">派发一个bus事件</button>
  </div>
</template>

<script>
// 引入 Parent 组件
import Parent from '@/components/Parent.vue'
export default {
  // 注册组件
  components:{
    Parent
  },
  data(){
    return {
      // message:' hello world'
      // obj:{
      //   message:' hello world'
      // }
      name:'张三'
    }
  },
  created(){
    // 使用 EventBus 派发一个事件
    // this.$bus.$emit('sendName',this.name)
  },
  methods:{
    changeMsg(){
      // this.message += '2'
      // this.obj.message += '2'
    },
    changeName(){
      this.name = '李四'
    },
    sendEvent(){
      this.$bus.$emit('sendName',{name: '123'})
    }
  },
  provide(){
    return {
      // 定义一个键名 为msg  通过provide 将this.message提供出去
      // msg: this.message
      // obj: this.obj
      name: this.name
      // name:()=>{
      //   return this.name
      // }
    }
  }
}
</script>

<style>

</style>
