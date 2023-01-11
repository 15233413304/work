<template>
  <div>
    <el-table
    :data="tableList"
    height="550"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" v-permission="$store.state.PermissionStatus">编辑</el-button>
        <el-button type="text" size="small" v-permission="$store.state.PermissionStatus">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="$store.state.total">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Permission from '@/directives/Permission'
export default {
  data() {
      return {
        pageInfo:{
          page:1,
          pageSize:10,
        }
      }
  },
  directives:{Permission},
  computed:{
    // tableList(){
    //   return this.$store.state.tableList
    // },
    // total(){
    //   return this.$store.state.total
    // },
    ...mapState(['tableList','total'])
  },
  methods:{
    ...mapActions(['getTableList']),
    // getTableList(pageInfo){
    //   this.$store.dispatch('getTableList',pageInfo)
    // }
    handleSizeChange(val) {
    //  console.log(`每页 ${val} 条`);
     this.pageInfo.pageSize = val
     this.getTableList(this.pageInfo)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageInfo.page = val
      this.getTableList(this.pageInfo)
    },
    handleClick(){

    }
  },
  created(){
      this.getTableList(this.pageInfo)  
  },

}
</script>

<style lang="stylus" scoped>

</style>