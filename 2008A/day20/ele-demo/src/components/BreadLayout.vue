<template>
  <el-breadcrumb separator="/">
    <!-- 循环父组件传递过来的面包屑标签内容 和 路由地址 -->
    <el-breadcrumb-item
      v-for="item in breadList"
      :key="item.path"
      :to="{ path: item.path }"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  props: {
    breadList: {
      type: Array,
    },
  },
};
</script>

<style>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>