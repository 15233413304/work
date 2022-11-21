<template>
  <!-- 遮罩层 -->
  <div class="mask" v-if="show">
    <!-- 内容 -->
    <div>
      {{title}}
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.mask{
  // 宽高和页面相同
  height: 100vh;
  width: 100vw;
  // 相对定位
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.2);
  // 权重值
  z-index: 999;
  // 转换为弹性盒
  display: flex;
  // 子元素水平居中
  justify-content: center;
  // 子元素垂直居中
  align-items: center;
  div{
    background: rgba(0,0,0,.8);
    border-radius: 50px;
    color: #fff;
    padding: 5px;
  }
}

</style>