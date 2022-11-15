<template>
  <div>
    <!-- 我是组件！ -->
    <p>{{msg}}</p>
    <div v-for="(item,index) in arr" :key="index">
      <p>{{item.name}}</p>
      <p>{{item.age}}</p>
    </div>
    <h1>
      <!-- <TheChildren :msg="msg"/> -->
      <the-children :msg="msg"/>
    </h1>
  </div>
</template>

<script>
import TheChildren from './TheChildren.vue'
// import TheChildren from '@/components/TheChildren.vue'
export default {
  components: { TheChildren },
  // components:{
  //   TheChildren
  // },
  // properties 的缩写 vue提供的一个接收父组件值的方法
  // props:['msg','arr']
  props:{
    msg:{
      // 类型校验
      type:String,
      // 是否为必填项 必传项 默认为false
      required: true,
    },
    arr:{
      // 类型校验
      type:Array,
      // 默认值
      default: ()=> [{name:'无名',age:'不详'}]
    }
  }
}
</script>

<style>

</style>