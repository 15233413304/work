<template>
  <div>
    <el-table :data="TableList" height="500">‘
      <el-table-column label="日期" width="180">
        <!-- 使用默认插槽 接收一个作用域传过来的参数 -->
        <template #default="scope">
          {{OrderFormat(scope.$index)}}
        </template>  
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template #default="scope">
          {{DateFormat(scope.row.date)}}
        </template>  
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" size="mini" @click="handleSee(scope.row.id)">查看</el-button>
          <el-button type="text" size="mini" @click="handleEdit(scope.row.id)" v-permission="per">编辑</el-button>
          <el-button type="text" size="mini" @click="handleDelete(scope.row.id)" v-permission="per">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-pagation/>
  </div>
</template>

<script>
import TablePagation from '@/components/TablePagation.vue';
// 引入自定义指令的文件
import Permission from '@/directives/Permission';
import dayjs from 'dayjs'
export default {
  components:{
    TablePagation
  },
  props:{
    TableList:{
      type: Array,
    }
  },
  // 注册自定义指令 注册后的指令 可以通过 v-小写的指令名
  directives:{
    Permission
  },
  data(){
    return{
      page:1,
      pageSize:10,
      per: 1, // 0普通用户 1管理员
    }
  },
  created(){
    // 监听派发的page事件
    this.$bus.$on('page', ({page, pageSize}) => {
      // 将page 和 pageSize 存到这个组件中 方便计算序号
      this.page = page
      this.pageSize = pageSize
    })
  },
  methods:{
    // 整理日期格式
    DateFormat(t){
       return dayjs(t).format('YYYY-MM-DD hh:mm:ss')
    },
    // 计算对应的序号
    OrderFormat(index){
      let { page, pageSize } = this
      return (page-1) * pageSize + index + 1
    },
    handleSee(id){

    },
    handleEdit(id){

    },
    handleDelete(id){
      this.$emit('del',{id,page: this.page, pageSize: this.pageSize})
    }
  }
};
</script>

<style lang='scss' scoped>
  .el-table{
    width: 1200px;
    margin: 10px auto;
  }
</style>
