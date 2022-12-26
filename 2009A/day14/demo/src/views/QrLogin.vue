<template>
  <div>
    <van-nav-bar title="登陆确认"/>
    <van-button type="primary" @click="handleLogin"> 登陆 </van-button>
    <van-button type="default" @click="$router.back()"> 取消登陆 </van-button>
  </div>
</template>

<script>
export default {
  methods:{
    handleLogin(){
      localStorage.setItem('logined',+new Date())
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>