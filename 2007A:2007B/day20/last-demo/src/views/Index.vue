<template>
  <div class="container">
    <!-- 头部导航 -->
    <div class="container-header">
        <van-nav-bar :title="$route.meta.title"/>
    </div>
    <!-- 中间的内容 -->
    <div class="container-content">
        <!-- 路由出口 子路由展示的内容 -->
        <router-view></router-view>
    </div>
    <!-- 页脚 -->
    <div class="container-footer">
        <van-tabbar route>
            <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item replace to="/shop" icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item replace to="/address" icon="guide-o">地址</van-tabbar-item>
            <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.container{
    height: 100%;
    // 弹性盒布局 使其头尾固定中间内容滚动
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 改变轴向
    flex-direction: column;
    &-header{
        height: 50px;
    }
    &-content{
        flex: 1;
        // 纵轴溢出自适应滚动
        overflow-y: auto;
    }
    &-footer{
        height: 50px;
    }
}
</style>