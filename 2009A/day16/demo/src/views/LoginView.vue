<template>
  <div>
    <van-nav-bar :title="$route.meta.title"/>
    <van-form @failed="onFailed" @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="form.phone"
        label="手机号"
        name="pattern"
        placeholder="请输入手机号"
        :rules="[{ pattern:rules.phone, message: '请输入正确的手机号' }]"
      />
      <van-field
        v-model="form.password"
        name="pattern"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ pattern:rules.pwd, message: '请输入正确密码,只能包含数字、字母、下划线不低于8位' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data(){
    return{
      form:{
        phone:'',
        password:''
      },
      rules:{
        // 手机号校验 规则：1开头 第二位3-9 剩余9位数结尾
        phone: /^1[3-9]\d{9}$/,
        // 密码校验 规则：数字字母下划线 不得低于8位
        pwd: /\w{8,}$/
      }
    }
  },
  methods:{
    onFailed(){
      Toast.fail('请检查格式是否正确')
    },
    onSubmit(){
      Toast.success('登陆成功')
      // 登陆成功存一个登陆状态
      localStorage.setItem('token', +new Date())
      this.$router.push(`${localStorage.RouterPath}`)
    }
  }
}
</script>

<style>

</style>