<template>
  <div class="login">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
    
    <el-form-item label="用户名" prop="user">
        <el-input v-model.number="ruleForm.user"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data() {
      return {
        ruleForm: {
          user: '',
          pass: ''
        },
      };
    },
    methods: {
      ...mapMutations(['login']),
      submitForm() {
        const { user,pass } = this.ruleForm
        if(pass!=='' && user!==''){
            this.login({user,pass})
            this.$router.push('/home')
        }
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    }
  }
</script>

<style>

</style>