<template>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="2"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/admin/list">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <div class="router">
        <router-view></router-view>
      </div>
    </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  min-height: 100vh;
}
.tac{
    display: flex;
    justify-content: space-between;
}
.router{
  flex: 1;
}
</style>