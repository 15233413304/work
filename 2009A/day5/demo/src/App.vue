<template>
  <div id="app">
    {{list}}
    <!--第三步 使用组件 两种使用方式 大驼峰 xx-xx 尽量统一用这两个的一种-->
    <!-- <BaseBanner/> -->
    <base-banner/>

  </div>
</template>

<script>


import axios from '@/utils/http'
// 第一步 引入组件
// import BaseBanner from '@/components/BaseBanner.vue'
export default {
  data(){
    return{
      list:[]
    }
  },
  components:{
    // 第二步 局部注册组件
    // BaseBanner
  },
  // created(){
  //   axios.get('/api/list').then(res=>{
  //     console.log(res)
  //     this.list = res
  //   })
  // }
  async created(){
    this.list = await axios.get('/api/list')
  }
};
</script>


<style lang="scss">

</style>
