<template>
  <div>
    <van-button type="primary" @click="handleLogin">登陆</van-button>
    <van-button type="default" @click="handleCancle">取消登陆</van-button>
  </div>
</template>

<script>
export default {
    methods:{
        handleLogin(){
            localStorage.setItem('logined',+new Date())
            this.$router.push('/home')
        },
        handleCancle(){
            window.close()
        }
    }
}
</script>

<style>

</style>