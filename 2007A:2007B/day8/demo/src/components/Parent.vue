<template>
  <div>
    <!-- {{msg}} -->
    <!-- {{obj.message}} -->
    {{name()}}
    <hr>
    <Children/>
  </div>
</template>

<script>
// 引入 Children 组件
import Children from '@/components/Children.vue'
export default {
    // 注册组件
    components:{
        Children
    },
    // inject: ['msg']
    // inject:['obj']
    inject:['name']
}
</script>

<style>

</style>