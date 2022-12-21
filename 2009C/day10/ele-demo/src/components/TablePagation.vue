<template>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total()">
    </el-pagination>
</template>

<script>
  export default {
    inject:['total'],
    methods: {
      // 每页展示数据条数改变时 触发的事件
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageInfo.pageSize = val
        this.getList()
      },
      // 当前页码改变时 触发的事件 
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageInfo.page = val
        this.getList()
      },
      getList(){
        // 派发一个page事件 将页码和每页显示条数传过去
        this.$bus.$emit('page', this.pageInfo)
      }
    },
    created(){
        this.getList()
    },
    data() {
      return {
        pageInfo:{
            // 每页显示多少条数据
            pageSize:10,
            // 当前时第几页 
            page: 1
        }
      };
    }
  }
</script>

<style>
.el-pagination{
    width: 800px;
    margin: 10px auto;
}
</style>