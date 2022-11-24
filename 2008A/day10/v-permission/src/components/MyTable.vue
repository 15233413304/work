<template>
    <el-table
    :data="tableData"
    border
    style="width: 70%">
    <el-table-column
      label="序号"
      width="150">
      <template #default="scoped">
        {{scoped.$index+1}}
      </template>
    </el-table-column>
    <el-table-column
      label="日期"
      width="150">
      <template #default="scoped">
        {{formmate(scoped.row.date)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
      <!-- <template #header="scoped">
        {{scoped.column.label}}
      </template> -->
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template default="scope">
        <el-button @click="handleSee(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="handleDel(scope.row)" v-permission="user">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import _ from 'lodash'
import dayjs from 'dayjs'
import permission from '@/directives/Permission'
export default {
    data(){
        return{
            // 0 普通用户 1管理员
            user: 0,
        }
    },
    props:{
        tableData:{
            type: Array,
            required: true
        }
    },
    directives:{
      permission
    },
    // created(){
    //    console.log( _.add(1, 2));
    // }
    methods:{
        // 转换时间戳为日期 年/月/日
        formmate(time){
            return dayjs(time).format('YYYY/MM/DD')
        },
        // 点击查看的按钮
        handleSee(){
            
        },
        // 点击删除的按钮
        handleDel(){

        }
    }
}
</script>

<style>

</style>