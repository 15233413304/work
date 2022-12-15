<template>
  <div>
    <!-- 默认插槽 -->
    <!-- <slot></slot> -->

    <!-- 具名/命名插槽 -->
    <!-- 命名插槽的name需要和父组件 template中的 v-slot: 后面的名字一致 -->
    <slot name="msg" :msg="data.msg"></slot>
    <slot name="name" :slotName="data.name"></slot>
    <slot name="age" :age="data.age"></slot>
    <!-- <slot name="time" :time="data.time"></slot> -->
    <!-- 在默认插槽中使用作用域 -->
    <slot :time="data.time"></slot>
  </div>
</template>

<script>
// import timeMinxins from '@/minxins/time'
export default {
    // minxins:[timeMinxins],
    props:{
        data:{
            type:Object,
            required:true,
        }
    },
}
</script>

<style>

</style>