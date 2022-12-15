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
  //第二步：子组件中接受父组件传递过来的money 这个money名字和父组件 : 后边的名字要保持一致
  // props:{
  //   money:{
  //     // 类型校验
  //     type:Number,
  //     // 必传项
  //     required: true
  //   }
  // },
  // 在后代组件中 通过inject可以拿到provide提供的数据 并注入到this实例中
  // inject:['money'],
  // inject:['mon'],
  // inject:['form'],
  data(){
    return {
      money:0
    }
  },
  created(){
    console.log(1)
    // 使用this.$bus.$on 监听 $bus.$emit派发的事件
    // this.$bus.$on(派发的事件名,回调函数)
    // 这个回调函数 默认接受的参数就是  $bus.$emit传过来的数据
    this.$bus.$on('sendMoney',(data)=>{
      // console.log(data)
      this.money = data
    })
  },

  methods:{
    handleCur(){
      //子传父 通知父组件执行一个名为 cur 的自定义事件 @cur="函数"
      // this.$emit('cur',10)
      this.$bus.$emit('cur',10)
    },
    handleAdd(){
      // this.$emit('add',10)
      this.$bus.$emit('add',10)
    }
  }
}
</script>