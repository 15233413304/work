<template>
    <div>
        <van-nav-bar title="登陆"/>
        <van-form validate-first @failed="onFailed" @submit="onSubmit">
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
                v-model="phone"
                name="pattern"
                placeholder="请输入手机号"
                label="手机号"
                :rules="[{ pattern:rules.phone, message: '请输入正确手机号' }]"
            />
            <van-field
                v-model="pwd"
                type="password"
                name="pattern"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ pattern:rules.pwd, message: '请输入正确密码,只能包含数字、字母、下划线,不低于8位' }]"
            />
            <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
<script> 
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        phone: '',
        pwd:'',
        rules:{
            phone:/^1[3-9]\d{9}$/,
            pwd: /\w{8,}/
        }
      };
    },
    methods: {
      // 校验函数返回 true 表示校验通过，false 表示不通过
      validator(val) {
        return /1\d{10}/.test(val);
      },
      // 异步校验函数返回 Promise
      asyncValidator(val) {
        return new Promise((resolve) => {
          Toast.loading('验证中...');
  
          setTimeout(() => {
            Toast.clear();
            resolve(/\d{6}/.test(val));
          }, 1000);
        });
      },
      //校验规则不通过
      onFailed() {
        Toast.fail('请检查参数是否正确')
      },
      //校验规则通过
      onSubmit(){
        localStorage.setItem('token',+new Date())
        this.$router.push(`${localStorage.RouterPath || '/home' }`)
      }
    },
  };
</script>
