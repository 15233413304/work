<template>
  <div>
    <van-nav-bar title="登陆"/>
    <van-form  @submit="onSubmit">
        <van-field
            v-model="phone"
            name="pattern"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ pattern: rules.phone, message: '请输入正确手机号' }]"
        />
    <van-field
        v-model="password"
        type="password"
        name="pattern"
        label="密码"
        placeholder="密码"
        :rules="[{ pattern: rules.pwd,required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
</van-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            phone:'',
            password:'',
            rules:{
                // 匹配11位数字
                phone:/\d{11}/,
                // \w匹配字母数字下划线
                pwd: /\w{8,}$/
            }
        }
    },
    methods:{
        onSubmit(){
            localStorage.setItem('token',+new Date())
            this.$router.replace(`${localStorage.backRouter}`)
        }
    }
}
</script>

<style>

</style>