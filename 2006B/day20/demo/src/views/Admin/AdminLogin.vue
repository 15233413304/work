<template>
  <div class="container">
    <div class="login">
        <el-input v-model="form.user" label="账号" placeholder="请输入账号"></el-input>
        <el-input v-model="form.pwd" label="密码" type="password" placeholder="请输入密码"></el-input>
        <el-button type="primary" @click="handleLogin">登陆</el-button>
     </div>
  </div>
</template>

<script>
import axios from '@/axios/axios';
export default {
    data(){
        return {
            form:{
                user:'',
                pwd:''
            }
        }
    },
    methods:{
        async handleLogin(){
            await axios.get('/api/admin',{params:{...this.form}}).then(res=>{
                sessionStorage.setItem('token',res.data.permission)
                this.$router.push('/admin')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(237, 240, 205, 0.6);
    .login{
        background: hotpink;
        width: 500px;
        height: 200px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 50px;
        .el-input{
            margin: 10px;
        }
        .el-button{
            margin-left: 358px;
            width: 150px;
        }
    }
}

</style>