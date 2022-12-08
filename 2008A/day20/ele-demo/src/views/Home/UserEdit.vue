<template>
  <div>
    <!-- 面包屑 -->
    <bread-layout :breadList="bread" />
    <!-- form表单 -->
    <el-form label-position="left" label-width="80px" :model="form">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</template>
<script>
// 引入uuid （需要下包）
import { v4 as uuid } from 'uuid'
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
      },
      // 面包屑 标签内容 和 路由地址
      bread: [
        { path: "/", title: "首页" },
        { path: "/table", title: "用户列表" },
        { path: "/edit", title: "新增用户" },
      ],
    };
  },
  created(){
    // 根据路由携带参数 有没有id 判断是编辑还是新建
    if(this.$route.query.id){
       //  如果是编辑 获取用户的信息
       let data = this.$store.state.userList.find(item=>item.id == this.$route.query.id)
       //  将表单内容覆盖 数据回显
       this.form = {...data}
    }
  },
  methods:{
    // 提交新增用户信息 / 提交编辑用户信息
    handleSubmit(){
        let { id } = this.$route.query
        if(id){
           // 如果是编辑 调用编辑的函数
           return this.handleEdit(id)
        }
        // 如果是新增 调用新增的函数
        this.handleAdd()
    },
    // 编辑用户
    handleEdit(id){
        this.$store.dispatch('editUserList',{
            ...this.form,
        })
        // 跳转回用户列表
        this.$router.push('/table')
    },
    // 新增用户
    handleAdd(){
        this.$store.dispatch('addUserList',{
            ...this.form,
            // 生成一个id 作为用户的id
            id:uuid(),
            // 生成一个时间 作为用户的创建时间
            date: +new Date()
        })
        // 跳转回用户列表
        this.$router.push('/table')
    }
  }
};
</script>