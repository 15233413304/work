<template>
  <div class="index">
    <div class="header">
        <nav-bar title="路由"/>
    </div>
    <div class="body">
        <router-view></router-view>
    </div>
    <div class="footer">
        <tabbar route>
            <tabbar-item replace to="/home" icon="home-o">主页</tabbar-item>
            <tabbar-item replace to="/class" icon="search">分类</tabbar-item>
        </tabbar>
    </div>
  </div>
</template>

<script>
import { NavBar,Tabbar,TabbarItem } from 'vant'
export default {
    components:{
        NavBar,Tabbar,TabbarItem
    }
}
</script>

<style lang="scss">
.index{
    // 先继承App.vue的高度
    height: 100%;
    // 弹性盒布局
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 改变轴向
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