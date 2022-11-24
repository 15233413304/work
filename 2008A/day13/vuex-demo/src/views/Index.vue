<template>  
  <div class="index-container">
    <van-nav-bar title="vuex"/>
    <div class="body">
      <router-view/>
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search">标签</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<!-- scoped 属性 防止和其他模块 类、id选择器选择器有重名导致样式冲突 -->
<style lang="scss" scoped>
.index-container{
  height: 100%;
  // 转换为弹性盒
  display: flex;
  // 改变轴向
  flex-direction: column;
  // 两端对齐
  justify-content: space-between;
  .body{
    flex: 1;
    overflow: auto;
  }
  .footer{
    height: 50px;
  }
}
</style>