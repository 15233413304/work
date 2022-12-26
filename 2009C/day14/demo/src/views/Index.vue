<template>
  <div class="container">
    <div class="header">
      <van-nav-bar :title="navTitle" />
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="user-o">{{ MyTitle }}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    navTitle(){
      return this.$route.meta.title
    },
    MyTitle(){
      return localStorage.logined?'我的':'未登陆'
    }
  }
}
</script>

<style lang="scss">
.container{
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .header{
    height: 50px;
  }
  .body{
    flex: 1;
    overflow: auto;
  }
  .footer{
    height: 50px;
  }
}
</style>