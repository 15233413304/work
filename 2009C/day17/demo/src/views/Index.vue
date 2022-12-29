<template>
  <div class="container">
    <div class="header">
      <van-nav-bar :title="$route.meta.title"/>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/shop" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/address" icon="location-o">收货地址</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.container
  display flex
  justify-content space-between
  flex-direction column
  height 100%
  .body
    flex 1
    overflow auto
  .footer
    height 50px
</style>
