<template>
  <div>
    <!-- 二级路由 -->
    <router-view/>
    <!-- 底部导航 -->
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" push to="/home">主页</van-tabbar-item>
        <van-tabbar-item icon="search" push to="/shop">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o" >标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o" >标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods:{
   
  }

};
</script>

<style>

</style>