<template>
  <div class="index">
    <div class="header">
        <van-nav-bar title="hello"/>
    </div>
    <div class="body">
        <router-view></router-view>
    </div>
    <div class="footer">
        <van-tabbar route>
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/my" icon="manager-o">{{text}}</van-tabbar-item>
        </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
    computed:{
        text(){
            if(localStorage.token){
                return '我的'
            }
            return '未登陆'
        }
    }
}
</script>

<style lang="scss" scoped>
.index{
    height: 100%;
    // 转为弹性盒
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 转换轴向
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