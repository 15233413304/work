<template>
  <div>
    <el-table :data="TableList" height="500">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:{
    TableList:{
      type: Array,
    }
  }
};
</script>

<style lang='scss' scoped>
  .el-table{
    width: 800px;
    // 宽高溢出自适应滚动
    overflow: auto;
  }
</style>
