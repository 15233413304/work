<template>
  <div class="index">
    <div class="header">
     <van-nav-bar :title="$route.meta.nav?$route.meta.nav:'购物'"/>
    </div>
    <!-- 一级路由出口 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/address" icon="location-o">地址</van-tabbar-item>
     </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.index{
  height: 100%;
  // 转换为弹性盒 弹性盒默认 是子元素在同一行横向排列
  display: flex;
  // 将横轴转化为纵轴 改变轴向
  flex-direction: column;
  // 两端对齐 改变轴向之后 变成上下对齐
  justify-content: space-between;
  .header{
    height: 46px;
  }
  .main{
    // 分排弹性盒的剩余空间
    flex: 1;
    // 溢出自适应滚动条
    overflow: auto;
  }
  .footer{
    height: 50px;
  }
}
</style>