<template>
  <div class="view">
    <div class="header">
       <nav-bar :title="title"/>
    </div>
    <div class="body">
        <router-view/>
    </div>
    <div class="footer">
        <van-tabbar route>
            <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item replace to="/my" icon="manager-o">{{loginText}}</van-tabbar-item>
        </van-tabbar>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components:{
        NavBar
    },
    // 计算属性
    computed:{
        // 每次切换路由的时候  this.$route.mata.name 都会改变
        title(){
            return this.$route.meta.name
        },
        loginText(){
            if(localStorage.getItem('logined')){
                return '我的'
            }
            return '未登录'
        }
    },
}
</script>

<style lang="scss">
.view{
    height: 100%;
    // 转为弹性盒
    display: flex;
    // 改变轴向
    flex-direction: column;
    // 弹性盒两端对齐
    justify-content: space-between;
    .header{
        height: 50px;
    }
    .body{
        //自动分配剩余空间
        flex: 1;
        // 高度宽度溢出自适应
        overflow: auto;
    }
    .footer{
        height: 50px;
    }
}
</style>