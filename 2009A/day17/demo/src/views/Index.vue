<template>
  <div class="container">
    <div class="header">
      <van-nav-bar :title="$route.meta.title"/>
    </div>
    <div class="body" ref="bodys">
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/address" icon="location-o">地址</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){

  }
}
</script>

<style lang="stylus">
.container
  height 100%
  width 100%
  display flex
  justify-content space-between
  flex-direction column
  .body
    overflow auto
    flex 1
  .footer
    height 50px
</style>