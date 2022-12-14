<template>
  <div id="app">
  <!-- 使用组件 通过标签的形式使用 -->
  <!-- 组件通信 父组件向子组件传值 
    通过 v-bind:自定义属性="要传过去的值"
    缩写 :自定义属性="要传过去的值"
  -->
  <base-banner :banner-list="bannerList" :auto-time="1000"/>
  <!-- {{list}} -->
  <!-- <BaseBanner/> -->
  <!-- 定义一个自定义事件 让子组件能通知过来 这个自定义事件名要和子组件$emit通知的保持一致 -->
  <shop-cart :shop="shopList" 
   @changeCheck="changeCheckAll"
   @handleCur="curCount"
   @handleAdd="addCount"
   @del="delShop"
  />
  </div>
</template>

<script>
// 第一步 引入组件  @/代表的是 src/
import BaseBanner from '@/components/BaseBanner.vue'
import ShopCart from '@/components/ShopCart.vue'
import axios from '@/utils/http';

export default {
  // 第二步 局部注册组件
  components:{
    BaseBanner,
    ShopCart,
  },
  data(){
    return {
      // 轮播图数据
      bannerList:[],
      // 购物车数据
      shopList:[],
    }
  },
  methods:{
    // 全选/取消全选
    changeCheckAll(check){
      this.shopList.forEach(item=>{
        item.isCheck = check
      })
    },
    // 商品减少
    curCount(index){
      if(this.shopList[index].count>1){
        this.shopList[index].count --
        console.log(1)
      }
    },
    // 商品增加
    addCount(index){
      this.shopList[index].count ++
    },
    // 删除商品
    delShop(index){
      this.shopList.splice(index,1)
    }
  },
  // 生命周期 ： 组件从创建到销毁的过程 就是生命周期
  
  // 实例创建前 执行的生命周期钩子函数 获取不到vue里的实例
  // data里的属性，methods里的属性，computed里的属性 watch里的属性 在这个阶段都不会生效
  beforeCreate(){
    console.log('App___beforeCreate')
  },
  // 实例创建后 此时 vue的实例已经创建完毕 this.xxx 都可以使用了
  created(){
    console.log('App___created')
    // 使用 $nextTick 可以保证所有组件都渲染完毕之后执行
    // 如果有一些逻辑想等到所有组件渲染完毕再执行
    this.$nextTick(async ()=>{
      this.bannerList = await axios.get('/api/banner')
      this.shopList = await axios.get('/api/shop')
    })
    // this.$nextTick(()=>{
    //   axios.get('/api/banner').then(res=>{
    //     this.list = res
    //   })
    // })
  },
  // 实例挂载前 页面完成渲染前
  beforeMount(){
    console.log('App___beforeMount')
  },
  // beforeMount => mounted 这个过程中 会渲染子组件
  // 实例挂载后 页面完成渲染 但不能保证所有的子组件都已经完成渲染
  mounted(){
    console.log('App___mounted')
  },
  // 页面更新前 数据已经更新了 页面还没有更新
  beforeUpdate(){
    console.log('App___beforeUpdate')

  },
  // 页面更新后 数据和页面此时都更新完毕了
  updated(){
    console.log('App___updated')

  },
  // 组件销毁前
  beforeDestroy() {
    console.log('App___beforeDestroy')
    
  }, 
  // 组件销毁后
  destroyed(){
    console.log('App___destroyed')

  }




};
</script>

<style lang="scss">

</style>
