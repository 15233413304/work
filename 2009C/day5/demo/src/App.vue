<template>
  <div id="app">
    <!-- 第三步 使用组件 两种写法 大驼峰写法 kebab-case 这两种写法在项目中选一个统一使用-->
    <!-- <BaseBanner/> -->

    <!-- 使用子组件 向子组件传递数据 父传子
      v-bind:绑定一个自定义属性="存储数据的变量" 
      可以缩写成  :自定义属性="存储数据的变量"-->
    <base-banner :list="bannerList" :auto-time="1000"/>
    <!-- {{bannerList}} -->
    <hello-world/>
  </div>
</template>

<script>
import axios from '@/utils/http'
// 第一步 引入组件
import BaseBanner from '@/components/BaseBanner.vue'
export default {
  data(){
    return {
      bannerList:[]
    }
  },
  components:{
    // 第二步 局部注册组件
    BaseBanner,
  },
  async created(){
    // axios.get('/api/banner').then(res=>{
    //   console.log(res)
    //   this.bannerList = res
    // })
    this.bannerList = await axios.get('/api/banner')
  }
};
</script>

<style lang="scss">

</style>
