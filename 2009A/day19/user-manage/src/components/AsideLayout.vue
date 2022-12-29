<template>
   <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu
      default-active="/home"
      router
      class="el-menu-vertical-demo">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/edit">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">编辑</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
</template>

<script>
export default {

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
