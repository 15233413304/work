<template>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        <span>{{ navText }}</span>
    </el-header>
</template>

<script>
export default {
  computed:{
    navText(){
      console.log(this.$store.state)
      return this.$store.state.userName?`欢迎回来，${this.$store.state.userName}`:'未登陆'
    }
  },
  methods:{
    // 下拉框选择时触发的事件
    handleCommand(command){
      //登出
      if(command == 'logout'){
        localStorage.removeItem('token')
        this.$router.replace('/login')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>