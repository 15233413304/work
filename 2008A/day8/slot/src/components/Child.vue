<template>
  <div class="child">
    <!-- {{slotValue}} -->
    <!-- 默认插槽 接收父组件使用这个组件时 里面写的内容 -->
    <!-- <slot></slot> -->

    <!-- 命名插槽/具名插槽 -->
    <!-- <h3>标题名</h3>
    <slot name="title"></slot>
    <h3>用户名</h3>
    <slot name="user"></slot>
    <input type="text" v-model="user">
    <h3>用户年龄</h3>
    <slot name="age"></slot>
    <input type="text" v-model="age"> -->

    <h3>标题名</h3>
    <slot name="title"></slot>
    <h3>用户名</h3>
    <!-- 作用域插槽 -->
    <slot name="user" :slotName="user"></slot>
    <input type="text" v-model="user">
    <h3>用户年龄</h3>
    <!-- 作用域插槽 -->
    <slot name="age" :slotAge="age"></slot>
    <input type="text" v-model="age">

  </div>
</template>

<script>
export default {
  data(){
    return{
      user:'',
      age:0,
    }
  },
  methods:{
    // aletA(){
    //   // alert('a')
    //   console.log('a')
    // }
  }
  // props:{
  //   slotValue:{
  //     type:String
  //   }
  // }
}
</script>

<style>

</style>