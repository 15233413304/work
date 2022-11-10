<template>
  <div>
    <nav-bar :tit="curTitle"/>
    <!-- 一级路由的出口 -->
    <router-view />

    <van-tabbar route @change="handleChange">
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/car" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
    data(){
        return{
            // 标题列表
            titleList: ['首页','购物车','我的'],
            // 传给nav-bar组件的 tit 
            curTitle: '首页'
        }
    },
    created(){
        // $route vue-router 提供的一个方法  可以在页面中使用this.$route 来获取路由的参数
        console.log(this.$route)
        if(this.$route.path == '/home'){
            this.curTitle = '首页'
        }else if(this.$route.path == '/car'){
            this.curTitle = '购物车'
        }else if(this.$route.path == '/my'){
            this.curTitle = '我的'
        }

        // switch(this.$route.path){
        //     case '/home': 
        //         this.curTitle = '首页'
        //         break
        //     case '/car':
        //         this.curTitle = '购物车'
        //         break
        //     case '/my':
        //         this.curTitle = '我的'
        //         break
        //     default: 
        //         this.curTitle = ''
        // }

    },
    methods:{
        // 点击切换tab时触发的事件
        handleChange(act){
            this.curTitle = this.titleList[act]
        }
    }
}
</script>

<style>

</style>