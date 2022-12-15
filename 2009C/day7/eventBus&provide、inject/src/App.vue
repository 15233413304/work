<template>
	<div>
    {{msg}}
    <!-- 第一步：通过自定义属性传递money -->
    <!-- <base-child :money="money" @add="addMoney" @cur="curMoney"/> -->
    <!-- <base-child  @add="addMoney" @cur="curMoney"/> -->
    <base-child/>
  </div>
</template>
<script>
import BaseChild from '@/components/BaseChild.vue'
export default{
  components:{
    BaseChild
  },
  // 使用provide提供数据
  // 非响应式
  // provide(){
  //   let { money } = this
  //   return {
  //     money
  //   }
  // },
  // 通过函数传递 实现响应式
  // provide(){
  //   return {
  //     mon:()=>{
  //       return this.money
  //     }
  //   }
  // },
  // 通过响应式对象 实现响应式
  // provide(){
  //   let { form } = this
  //   return {
  //     form
  //   }
  // },
  created(){
    // 使用this.$bus.$on 监听 $bus.$emit派发的事件
    // this.$bus.$on(派发的事件名,回调函数)
    // 这个回调函数 默认接受的参数就是  $bus.$emit传过来的数据
    this.$bus.$on('add', (value) => {
      this.money += value
      this.$bus.$emit('sendMoney', this.money)
    })
    this.$bus.$on('cur', (value) => {
      this.money -= value
      this.$bus.$emit('sendMoney', this.money)
    })
  },
  mounted(){
    // 使用 this.$bus.$emit() 来派发事件
    // this.$bus.$emit(派发的事件名,派发的数据)
    this.$bus.$emit('sendMoney', this.money)
  },
  data(){
		return{
      msg:'钱包余额',
      money: 100,
      form:{
        money: 100
      }
    }
  },
  methods:{
     // 子组件点击 ‘钱包余额+’ 触发的自定义事件事件的回调函数
     // 这个函数默认有个参数是一个形参 子组件传过来什么 它就是什么
    //  addMoney(num){
    //   //  this.money += num
    //    this.form.money += num
    //  },
    //  curMoney(num){
    //   //  this.money -= num
    //   this.form.money -= num

    //  }
   }
}
</script>