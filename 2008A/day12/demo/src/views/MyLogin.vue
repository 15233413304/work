<template>
  <div>
    <nav-bar title="登录"/>

    <van-form @submit="onSubmit">
      <van-field
        v-model="userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components:{
    NavBar
  },
  data(){
    return {
      userName:'',
      password:''
    }
  },
  methods:{
    onSubmit(){
      // 一定要先存登录状态 再跳转
      if(this.userName !=='' && this.password !== ''){
        localStorage.setItem('logined','我登录！别拦我')
        // 拿到被拦截时存的路由地址
        const path = localStorage.getItem('prevRouter')
        this.$router.replace(path)
      }
    }
  }
}
</script>

<style>

</style>