<template>
  <div class="container">
    <div class="header">
      <van-nav-bar :title="navTitle"/>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    navTitle(){
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="stylus">
.container
  height 100%
  display flex
  justify-content space-between
  flex-direction column
  .header
    height 50px
  .body
    flex 1
    overflow auto
  .footer
    height 50px
</style>