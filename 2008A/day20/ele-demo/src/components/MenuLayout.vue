<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <!-- 可以加一个router属性 如果加上router el-menu-item 的index 就是路由的地址 -->
    <el-menu
      default-active="/table"
      class="el-menu-vertical-demo"
      router
      :collapse="isCollapse"
    >
      <el-menu-item index="/table">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-menu-item index="/nav2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="/nav3">
        <i class="el-icon-menu"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="/nav4">
        <i class="el-icon-menu"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
      return {
        // 展开还是收起
        isCollapse: true
      };
    },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>