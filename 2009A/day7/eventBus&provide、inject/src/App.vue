<template>
	<div>
    <!-- <base-child @cur="curMoney" @add="addMoney"/> -->
    <base-child/>

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
      money: 100,
      form:{
        money: 100,
      }
    }
  },
  created(){
    this.$bus.$on('cur',(num)=>{
       this.money -= num
       this.form.money -= num
       this.$bus.$emit('sendMoney', this.form.money)
    })
    this.$bus.$on('add',(num)=>{
       this.money += num
       this.form.money += num
       this.$bus.$emit('sendMoney', this.form.money)
    })
  },
  mounted(){
    // 派发一个事件 名为sendMoney 传过去一个值 是this.form.money
    this.$bus.$emit('sendMoney', this.form.money)
  },
  // 祖先组件提供数据 
  // 非响应式
  // provide(){
  //   let { money } = this
  //   return {
  //     money
  //   }
  // },
  // 通过箭头函数的方式传递过去值 是响应式的
  // provide(){
  //   return {
  //     mon:()=>{
  //       return this.money
  //     }
  //   }
  // },
  // 传过去一个响应式对象
  // provide(){
  //   let { form } = this
  //   return {
  //     form
  //   }
  // },

  methods:{
     // 子组件点击 ‘钱包余额+’ 触发的自定义事件事件的回调函数
     // 这个函数默认有个参数是一个形参 子组件传过来什么 它就是什么
    //  addMoney(num){
    //    this.money += num
    //    this.form.money += num
    //    this.$bus.$emit('sendMoney', this.form.money)
    //  },
    //  curMoney(num){
    //    this.money -= num
    //    this.form.money -= num
    //    this.$bus.$emit('sendMoney', this.form.money)
    //  }
   }
}
</script>