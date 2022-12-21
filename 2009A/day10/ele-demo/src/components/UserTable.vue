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
        <el-table-column
          label="操作">
          <template #default="scope">
            <el-button type="text">查看</el-button>
            <el-button type="text" v-permission="per">编辑</el-button>
            <el-button type="text" 
              @click="handleDelete(scope.row.id)" 
              v-permission="per">
               删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagation/>
    </div>
</template>

<script>
import TablePagation from '@/components/TablePagation.vue'
import Permission from '@/directives/Permission'
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
    // 注册自定义指令  注册后 这个指令就可以通过 v-小写字母的指令名 来使用
    directives:{
      Permission
    },
    data(){
      return{
        page: 1,
        pageSize: 10,
        per:1, // 0 普通用户 1 管理员
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
      },
      // 点击删除按钮 通过id 删除这一项
      handleDelete(id){
        let { page, pageSize } = this
        this.$emit('del',{id, page, pageSize})
      }
    }
}
</script>

<style lang="scss" scoped>
.el-table{
    width: 1200px;
    margin: 10px auto;
}
</style>