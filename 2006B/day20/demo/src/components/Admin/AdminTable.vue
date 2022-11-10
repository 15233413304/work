<template>
  <div>
    <el-table
      :data="dataList"
      border
    >
      <el-table-column fixed label="日期" width="200">
        <template #default="scope">
          {{tiemr(scope.row.date)}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
      <el-table-column prop="address" label="地址" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" v-permission="per">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="10"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
  
  <script>
export default {
  props: {
    dataList: {
      type: Array,
      required: true
    },
    total:{
      type: Number,
      default:()=> 0
    },
    per:{
      type:String
    }
  },
  data(){
    return{
      page:1,
      pageSize: 10,
      pageSizes:[10, 20, 30, 40]
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 改变每页显示数据条数的时候触法这个函数
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.$emit('changeSize',{page: this.page, pageSize})
    },
    // 点击第几页的时候触发
    handleCurrentChange(page){
      this.page = page
      this.$emit('changePage',{page: this.page, pageSize: this.pageSize})
    },
    tiemr(time){
      return `${new Date(time).getUTCFullYear()}/${new Date(time).getMonth()+1}/${new Date(time).getDate()}`
    }
  },
};
</script>

<style lang="scss" scoped>
.el-table{
  max-height: 800px;
  width: auto;
  overflow-y: auto;
  margin: 150px 150px 0;
  
}
.el-pagination{
  margin:10px 150px;
}
</style>