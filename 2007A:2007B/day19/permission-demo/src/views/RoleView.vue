<template>
  <div class="role">
    <!-- 表格 -->
    <el-table
      :data="tableData.list"
      border
      style="width: 90%">
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template #default="scope">
        {{$store.state.loginUser}}
        <el-button @click="handleClick(scope.row)" type="text" size="small" v-permission="$store.state.loginUser.permission">删除</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper, total"
      :total="tableData.total">
    </el-pagination>
  </div>
</template>

<script>
import Permission from '@/direcitve/Permission'
export default {
  directives:{ 
    Permission 
  },
  data(){
    return{
      // 当前第几页
      page:1,
      // 每页显示多少条数据
      pageSize:10,
    }
  },
  computed:{
    tableData(){
      return this.$store.state.userData
    }
  },
  created(){
    this.fetchList()
  },
  methods:{
    // 获取列表
    fetchList(){
      let { page, pageSize } = this
      this.$store.dispatch('getList',{ page, pageSize })
    },
    // 当每页显示多少条数据改变时触发的函数
    handleSizeChange(size){
      this.pageSize = size
      this.fetchList()
    },
    // 当前第几页改变时触发的函数
    handleCurrentChange(page){
      this.page = page
      this.fetchList()
    },

  }
}
</script>

<style lang="scss">
.el-table{
  margin: auto;
  .el-table__body-wrapper{
    max-height: 800px;
    overflow-y: auto;
  }
}
.el-pagination{
  margin: 10px 50px;
}
</style>