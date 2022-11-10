<template>
  <div>
    <nav-bar :navName="'登陆'" :hasBack="true"/>
    <van-form @submit="onSubmit">
    <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
        v-model="form.password"
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
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'vant'
export default {
    components:{
      NavBar
    },
    data(){
        return{
            form:{
                username:'',
                password:''
           }
        }
    },
    computed:{
        // 通过辅助函数mapState将vuex module里的login下的state的属性映射到this上
        ...mapState('login',['isLogin'])
    },
    methods:{
        // 使用辅助函数通知 store/module/login.js 里的mutations 下的login函数
        ...mapMutations('login',['userLogin']),
        onSubmit(){
            // 直接访问vuex module里的login下的state
            // console.log(this.$store.state.login.isLogin)
            // 通过辅助函数mapState将vuex module里的login下的state的属性映射到this上
            // console.log(this.isLogin)


            // 直接使用commit通知 store/module/login.js 里的mutations 下的login函数
            // 通知vuex里的mutations
            // this.$store.commit('login/userLogin',true)
            
            // console.log(this.isLogin)

            // 校验
            const { username, password } = this.form
            const reg = /^1[3-9]\d{9}$/
            if(username && reg.test(username) && password){
                // 使用辅助函数通知 store/module/login.js 里的mutations 下的login函数
                this.userLogin(true)
                this.$router.push('/home')
            }else{
                Toast('用户名或密码错误！')
            }
        }
    }
}
</script>

<style>

</style>