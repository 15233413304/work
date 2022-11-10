<template>
  <div>
    <p>子组件</p>
    <p v-for="(item,i) in list" :key="i" 
    :class="{active: i == idx}"
    
    >
        {{item}}
    </p>
  </div>
</template>

<script>
export default {
    // 父组件传过来的自定义属性
    props:['list','idx']
}
</script>

<style lang="scss">
.active{
    color: red;
}
</style>