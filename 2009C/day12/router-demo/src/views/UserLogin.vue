<template>
  <div>
    <nav-bar title="登陆"/>
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
            <van-button round block type="info" native-type="submit">登陆</van-button>
        </div>
    </van-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
     //   登陆成功后 存储登陆状态
      localStorage.setItem('logined', +new Date())
      let path = localStorage.RouterPath
    //   存完登陆状态后 跳转至之前被拦截的页面
     this.$router.push(`${path}`)
    },
  },
};

</script>

<style>

</style>