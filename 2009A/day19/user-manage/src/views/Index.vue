<template>
  <el-container class="container">
    <aside-layout/>
    
    <el-container>
      <header-layout/>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
  import AsideLayout from '@/components/AsideLayout.vue'
  import HeaderLayout from '@/components/HeaderLayout.vue'
  export default {
    components:{
      AsideLayout,
      HeaderLayout,
    },
  };
</script>

<style lang="stylus">
.container
  width 100%
  height 100%
  border 1px solid #eee
  .el-container
    flex-direction column
  .el-header
    // width 100%
    background-color #B3C0D1
    color #333
    line-height 60px
  .el-aside
    color #333
  
</style>