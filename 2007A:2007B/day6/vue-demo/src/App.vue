<template>
  <div class="app">
    <!-- 使用组件第三步 直接使用标签的形式使用 -->
    <!-- <hello></hello> -->
    <!-- <ShopCard></ShopCard> -->
    <!-- 组件通信 父组件传子组件 用 :自定义属性传递  -->
    <nav-bar title="首页"></nav-bar>
    <shop-card 
      :goods="list"
      @add="addFn"
      @sub="subFn">
    </shop-card>
  </div>
</template>

<script>
import axios from '@/axios/axios'
// 使用第一步 引入
import ShopCard from '@/componets/ShopCard.vue'

export default {
  components:{
  //   // 使用组件第二步 注册组件
  //   // 'hello':ShopCard
    ShopCard
  },
  data(){
    return {
      list:[]
    }
  },
  methods:{
    findIdx(id){
      return this.list.findIndex(item => item.id == id)
    },
    addFn(id){
      console.log(id)
      // 拿到点击那一项
      let index = this.findIdx(id)
      this.list[index].count ++
    },
    subFn(id){
      let index = this.findIdx(id)
      if(this.list[index].count>1){
        return this.list[index].count --
      }
      alert('最少一个')
    }
  },
  created(){
    axios.get('/list').then(res =>{
      // console.log(res.data)
      this.list = res.data
    })
  },
  mounted(){
    
  }
}

</script>

<style>

</style>