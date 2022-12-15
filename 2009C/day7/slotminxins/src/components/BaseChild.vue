<template>
  <div>
    <!-- 默认插槽 在父组件中以双标签的形式使用子组件 
      并且在这个标签中写的内容就需要用插槽来显示 -->
    <!-- <slot></slot> -->

    <!-- 具名/命名插槽 -->
    <!-- <slot name="user"></slot>
    <slot name="age"></slot>
    <slot name="time"></slot> -->

    <!-- 作用域插槽 -->
    <!-- <slot name="user" :user="data.name"></slot>
    <slot name="age" :age="data.age"></slot>
    <slot name="time" :time="data.time"></slot> -->

    <slot name="user" :rowData="data"></slot>
    <slot name="age" :rowData="data"></slot>
    <slot name="time" :rowData="data"></slot>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type: Object,
      required: true,
    }
  }
}
</script>

<style>

</style>