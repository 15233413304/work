<template>
    <div>
      <el-table
        v-if="list.length" 
        height="600"
        :data="list">
        <el-table-column
          label="序号"
          width="180">
          <template #default="scope">
            {{NumberFormat(scope.$index)}}
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="180">
          <template #default="scope">
            {{TimeFormat(scope.row.date)}}
          </template>
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
          prop="phone"
          label="手机号">
        </el-table-column>
      </el-table>
      <table-pagation/>
    </div>
</template>

<script>
import TablePagation from '@/components/TablePagation.vue'
import dayjs from 'dayjs'
export default {
    components:{
      TablePagation,
    },
    props:{
        list:{
            type:Array,
            default:()=> []
        }
    },
    data(){
      return{
        page: 1,
        pageSize: 10
      }
    },
    created(){
      this.$bus.$on('page',(data)=>{
        let { page, pageSize } = data
        this.page = page
        this.pageSize = pageSize
      })
    },
    methods:{
      TimeFormat(t){
        return dayjs(t).format('YYYY/MM/DD hh:mm:ss')
      },
      NumberFormat(index){
        let { page,pageSize } = this
        return (page-1) * pageSize + index +1
      }
    }
}
</script>

<style lang="scss" scoped>
.el-table{
    width: 800px;
    margin: 10px auto;
}
</style>