<template>
  <div>
    <van-tabs v-model="active" @change="changeTab">
      <van-tab v-for="item in 3" :key="item" :title="'标签'+item">
        <router-view/>
      </van-tab>


      <!-- <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active: 0,
    }
  },
  methods:{
    changeTab(index){
      if(index == 0){
        return this.$router.push('/home/tab1')
      }
      if(index == 1){
        return this.$router.push('/home/tab2')
      }
      if(index == 2){
        return this.$router.push('/home/tab3')
      }
    }
  }
}
</script>

<style>

</style>