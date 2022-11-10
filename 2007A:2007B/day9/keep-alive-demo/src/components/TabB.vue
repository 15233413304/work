<template>
  <div>
    组件B
  </div>
</template>

<script>
export default {
    created(){
        console.log('组件 B创建了')
    },
    destroyed(){
        console.log('组件 B销毁了')
    }
}
</script>

<style>

</style>