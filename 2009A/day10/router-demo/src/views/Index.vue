<template>
  <div class="index">
    <div class="header">
      头！！！
    </div>
    <div class="body">
      <!-- 路由视图的出口 -->
      <router-view></router-view>
    </div>
    <div class="footer">
      <!-- 声明式跳转路由 原理是 a标签的href属性 to="/路径" -->
       <router-link replace to="/home">首页</router-link>
       <router-link replace to="/class">分类</router-link>
       <div @click="handleToHome">首页</div>
       <div @click="handleToClass">分类</div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handleToHome(){
      // 命令式跳转 编程式跳转路由
      // this.$router.push('/home')
      this.$router.replace('/home')
    },
    handleToClass(){
      // this.$router.push('/class')
      this.$router.replace('/class')
    },
  }
}
</script>

<style lang="scss" scoped>
.index{
  height: 100%;
  // 弹性盒
  display: flex;
  // 两端对齐
  justify-content:space-between;
  // 改变轴向
  flex-direction: column;
  .header{
    height: 50px;
    border-bottom: 1px solid;
    text-align: center;
    line-height: 50px;
  }
  .body{
    // 自动分配剩余空间
    flex: 1;
    // 溢出自适应滚动
    overflow: auto;
  }
  .footer{
    height: 50px;
    border-top: 1px solid;
    display: flex;
    // 平均分对齐
    justify-content: space-evenly;
    // 垂直居中
    align-items: center;
    a{
      color: black;
      text-decoration: none;
    }
    .router-link-active{
      color: red;
    }
  }
}
</style>