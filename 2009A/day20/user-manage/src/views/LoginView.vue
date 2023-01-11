<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="用户名" prop="user">
            <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>    
        <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
      var validateuserName = (rule, value, callback) => {
        if (!this.ruleForm.userName) {
          callback(new Error('请输入用户名'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (!this.ruleForm.password) {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          userName: ''
        },
        rules: {
          pwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          user: [
            { validator: validateuserName, trigger: 'blur' }
          ]
        },
        btnLoading: false,
      };
    },
    methods: {
      submitForm(formName) {
        this.btnLoading = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('userLogin',{...this.ruleForm}).then(()=>{
              setTimeout(() => {
                if(localStorage.token && this.$store.state.PermissionStatus != -1){
                  this.$router.push('/home')
                } 
                this.btnLoading = false
              }, 1000);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm = {
          password: '',
          userName: ''
        }
      }
    }
}
</script>

<style lang="stylus" scoped>
.el-form{
    width 50%
    margin 300px auto
}
</style>