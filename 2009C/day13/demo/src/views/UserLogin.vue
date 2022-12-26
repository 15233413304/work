<template>
  <div>
    <van-nav-bar title="登陆"/>
    <van-tabs v-model="active">
    <van-tab title="账号密码登陆">
        <van-form @submit="onSubmit">
            <van-field
            v-model="username"
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
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </van-tab>
    <van-tab title="扫码登陆">
        <vue-qr text="192.168.0.188:8080/qrlogin" :size="200"></vue-qr>
    </van-tab>

</van-tabs>
    
  </div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  components:{
    VueQr,
  },
  data() {
    return {
      username: '',
      password: '',
      active: 0,
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      localStorage.setItem('logined',+new Date())
      this.$router.push(`${localStorage.RouterPath?localStorage.RouterPath:'/home'}`)
    },
  },
};
</script>

<style>

</style>