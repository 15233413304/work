<template>
	<div>
    {{msg}}
    <!-- 第一步：通过自定义属性传递money -->
    <base-child :money="money" @add="addMoney" @cur="curMoney"/>
  </div>
</template>
<script>
import BaseChild from '@/components/BaseChild.vue'
export default{
  components:{
    BaseChild
  },
  data(){
		return{
      msg:'钱包余额',
      money: 100
    }
  },
   methods:{
     // 子组件点击 ‘钱包余额+’ 触发的自定义事件事件的回调函数
     // 这个函数默认有个参数是一个形参 子组件传过来什么 它就是什么
     addMoney(num){
       this.money += num
     },
     curMoney(num){
       this.money -= num
     }
   }
}
</script>