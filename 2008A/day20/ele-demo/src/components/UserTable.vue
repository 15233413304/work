<template>
  <div>
    <!-- 新增用户 按钮 -->
    <el-button @click="handleAdd"> 新增 </el-button>
    <!-- 用户列表 表格 -->
    <el-table :data="tableData">
      <el-table-column label="日期" width="180">
        <template #default="scope">
          {{formatDate(scope.row.date)}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            v-permission
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="primary"
            v-permission
            @click="handleDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import permission from "@/directive/permission";
import dayjs from 'dayjs'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  directives: {
    permission,
  },
  methods: {
    handleAdd() {
      // 子传父 通知父组件 跳转到新增用户页面 @add
      this.$emit('add')
    },
    handleEdit(id) {
      // 子传父 通知父组件执行自定义事件 @edit
      this.$emit("edit", id);
    },
    handleDel(id) {
      // 子传父 通知父组件执行自定义事件 @del
      this.$emit("del", id);
    },
    // 使用dayjs将时间戳转换为日期
    formatDate(time){
      // 将时间戳 抓换 年-月-日 时:分:秒
      return dayjs(+time).format("YYYY-MM-DD h:mm:ss")
    }
  },
};
</script>

<style>
</style>