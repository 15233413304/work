<template>
  <div class="container">
    <div class="container-header">
        <van-nav-bar title="用户"/>
    </div>
    <div class="container-contnet">
        <router-view/>
    </div>
    <div class="container-footer">
        <van-tabbar route>
            <van-tabbar-item replace to="/user" icon="home-o">用户列表</van-tabbar-item>
            <van-tabbar-item replace to="/my" icon="search">我的</van-tabbar-item>
        </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container{
    // 转换为弹性盒
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 改变轴向
    flex-direction: column;
    &-header{
        height: 50px;
    }
    &-contnet{
        // 分配剩余空间
        flex: 1;
        // 滚动自适应 宽高超出元素就滚动
        overflow: auto;
    }
    &-footer{
        height: 50px;
    }
}
</style>