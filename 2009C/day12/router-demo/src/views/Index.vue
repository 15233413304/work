<template>
  <div class="container">
    <div class="container-header">
        <van-nav-bar title="路由"/>
    </div>
    <div class="container-body">
        <router-view />
    </div>
    <div class="container-footer">
        <van-tabbar route>
            <van-tabbar-item replace to="/index/home" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item replace to="/index/class" icon="cluster-o">分类</van-tabbar-item>
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
    // 继承App.vue盒子的高度
    height: 100%;
    // 弹性盒布局
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 改变轴向
    flex-direction: column;
    &-header{
        height: 50px;
    }
    &-body{
        // 自动分配剩余空间
        flex: 1;
        overflow: auto;
    }
    &-footer{
        height: 50px;
    }
}
</style>