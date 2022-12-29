<template>
  <div>
    <van-nav-bar :title="$route.meta.title"/>
  <van-form validate-first @failed="onFailed" @submit="onSubmit">
    <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="phoneNumber"
        name="pattern"
        placeholder="手机号"
        label="手机号"
        :rules="[{ pattern: rules.phone, message: '请输入正确的手机号' }]"
      />
      <van-field
        v-model="password"
        name="pattern"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="[{ pattern: rules.pwd, message: '请输入正确的密码,数字、字母、下划线八位以上' }]"
      />
      <van-button round block type="info" native-type="submit">登陆</van-button>
  </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data(){
    return{
      phoneNumber:'',
      password:'',
      // 正则校验的规则
      rules:{
        // 匹配 1开头 第二位是3-9 其余是9位数字
        phone: /^1[3-9]\d{9}$/,
        // 匹配数字字母下划线 8位以上
        pwd: /\w{8,}$/
      }
    }
  },
  methods:{
    // 正则校验不通过
    onFailed(){
      Toast.fail('请检查输入参数是否正确');
    },
    onSubmit(){
      Toast.success('登陆成功');
      // 存一个登陆状态
      localStorage.setItem('token', +new Date())
      // 跳转到之前被拦截的路由页
      this.$router.push(`${localStorage.RouterPath}`)
    }
  }
}
</script>

<style>

</style>