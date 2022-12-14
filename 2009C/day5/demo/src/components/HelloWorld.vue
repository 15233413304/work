<template>
  <div class="container">
    <div class="header">
      style中的属性
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<!-- style里的属性 lang language的缩写 是预处理器语言用什么（scss、less、stylus）  -->
<!-- scoped 样式作用域 防止和其他组件类名或id名一样的元素样式冲突 
     设置scoped后可能会导致 某些元素/标签 的样式不会生效
     如果因为设置了 scoped 样式不生效 可以通过 深度选择器来解决
     在scss less stylus 预处理器中 可以使用 :deep() 
     在更早的版本中使用的深度选择器是/deep/（已废弃）
     在原生css中和stylus预处理器中 可以使用 >>>  scss和less不支持这种写法
     深度选择器可以保证样式生效（通过样式穿透） 并且不会污染其他组件的样式（保留了scoped的作用）
-->
<!-- <style lang="scss" scoped>
.container{
    :deep(.header){
        width: 100px;
        height: 50px;
        background: #000;
    }
}
</style> -->

<style scoped>
    .container >>> .header{
        width: 100px;
        height: 50px;
        background: #000;
        color: white;
    }
</style>