<template>
	<div>
     <!-- 通知父组件执行一个名为add的自定义事件 @add="函数" -->
   	<button @click="handleAdd">钱包余额+</button>
      {{money}}
    	<!-- {{mon()}} -->
      <!-- {{form.money}} -->
    <button @click="handleCur">钱包余额-</button>
  </div>
</template>
<script>
export default{
  data(){
    return{
      money:0
    }
  },
  // 子孙组件通过inject方法拿到这个值并注入到this实例中
  // inject:['money'],
  // inject:['mon'],
  // inject:['form'],
  created(){
    console.log('222')
    // 通过this.$bus.$on(参数1,参数2) 监听派发的事件
    // 第一个参数就是$bus.$emit派发的事件名
    // 第二个参数是一个回调函数回调函数会有一个默认参数接收传递过来的值
    this.$bus.$on('sendMoney',(data)=>{
      this.money = data
    })
  },
  methods:{
    handleCur(){
      //子传父 通知父组件执行一个名为 cur 的自定义事件 @cur="函数"
      // this.$emit('cur',10)
      this.$bus.$emit('cur', 10)
    },
    handleAdd(){
      // this.$emit('add',10)
      this.$bus.$emit('add',10)
    }
  },
}
</script>