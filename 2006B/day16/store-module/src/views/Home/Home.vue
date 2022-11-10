<template>
  <div class="home">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="/home/list"
          class="el-menu-vertical-demo"
          router
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="/home/list">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/a">
            <i class="el-icon-document"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="/home/b">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss">
.home{
  display: flex;
}
.el-col{
  width: 300px;
}
.el-col>.el-menu{
  min-height: 100vh;
}

</style>