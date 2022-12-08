<template>
  <div class="login">
    <!-- form表单 -->
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登陆</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        // 用户名
        username: "",
        // 密码
         password: "",
      },
    };
  },
  methods: {
    // 登陆账号
    submitForm() {
      let { username, password } = this.ruleForm
      // 如果用户名和密码不为空 那就调登陆接口进行校验
      if(username.length && password.length){
        this.$store.dispatch('userLogin',{username, password}).then(()=>{
          if(localStorage.token){
            this.$router.push('/table')
          }
        })
      }
      
    },
    // 清空/重置输入内容
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form {
    width: 50%;
    margin: auto;
  }
}
</style>