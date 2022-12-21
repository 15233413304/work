<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total()">
    </el-pagination>
</template>

<script>
export default {
    inject:['total'],
    methods: {
      handleSizeChange(pageSize) {
        // console.log(`每页 ${pageSize} 条`);
        this.form.pageSize = pageSize
        this.getList()
      },
      handleCurrentChange(page) {
        // console.log(`当前页: ${page}`);
        this.form.page = page
        this.getList()
      },
      //派发事件用于请求接口
      getList(){
        this.$bus.$emit('page', this.form)
      }
    },
    data() {
      return {
        form:{
            // 当前第几页
            page: 1,
            // 当前每页显示多少条
            pageSize:10,
        }
        
      };
    },
    created(){
        this.getList()
    }
}
</script>

<style>
.el-pagination{
    width: 800px;
    margin: 10px auto;
}
</style>