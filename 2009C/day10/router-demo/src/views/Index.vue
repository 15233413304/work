<template>
  <div class="index">
    <div class="header">
        头部
    </div>
    <div class="body">
        <router-view></router-view>
    </div>
    <div class="footer">
        <!-- 声明式跳转路由  <router-link to="路由的路径">xxx</router-link> -->
        <router-link replace to="/home">主页</router-link>
        <router-link replace to="/class">分类</router-link>
        <!-- <div @click="handleToHome">主页</div>
        <div @click="handleToClass">分类</div> -->
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        // handleToHome(){
        //     // 命令式跳转路由 变成式跳转路由
        //     this.$router.push('/home')
        //     // this.$router.push({name:'home'})
        //     // this.$router.push({path:'/home'})
        // },
        // handleToClass(){
        //     this.$router.push('/class')
        // }
    }
}
</script>

<style lang="scss" scoped>
.index{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .header{
        height: 50px;
        border-bottom: 1px solid;
        line-height: 50px;
        text-align: center;
    }
    .body{
        flex: 1;
        overflow: auto;
    }
    .footer{
        height: 50px;
        display: flex;
        justify-content: space-evenly;
        border-top: 1px solid;
        align-items: center;
        a{
            text-decoration: none;
            color: black;
        }
        .router-link-active{
            color: red;
        }
    }
}
</style>