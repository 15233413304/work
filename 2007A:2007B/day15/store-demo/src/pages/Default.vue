<template>
  <div class="container">
    <div class="header">
        <van-sticky>
            <van-nav-bar :title="$route.meta.title?$route.meta.title:'购物平台'"/>
        </van-sticky>
    </div>
    <div class="center">
        <!-- 一级路由出口 -->
        <router-view></router-view>
    </div>
    <div class="footer">
        <van-tabbar route>
            <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item replace to="/shop" icon="cart-o">购物车</van-tabbar-item>
            <van-tabbar-item replace to="/my" icon="user-o">{{myTitle}}</van-tabbar-item>
        </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
    computed:{
        myTitle(){
            if(localStorage.getItem('logined')){
                return '我的'
            }
            return '未登录'
        }
    }
}
</script>

<style lang="scss">
.container{
    height: 100%;
    // 将container变成一个弹性盒
    display: flex;
    // 改变弹性盒轴向
    flex-direction: column;
    // 两端对齐
    justify-content: space-between;
    .center{
        flex: 1;
        // 溢出自适应
        overflow: auto;
    }
    .footer{
        height: 50px;
    }
}
</style>