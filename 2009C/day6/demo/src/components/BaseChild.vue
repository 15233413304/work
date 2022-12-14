<template>
	<div>
     <!-- 通知父组件执行一个名为add的自定义事件 @add="函数" -->
   	<button @click="$emit('add',10)">钱包余额+</button>
    	{{money}}
    <button @click="handleCur">钱包余额-</button>
  </div>
</template>
<script>
export default{
  //第二步：子组件中接受父组件传递过来的money 这个money名字和父组件 : 后边的名字要保持一致
  props:{
    money:{
      // 类型校验
      type:Number,
      // 必传项
      required: true
    }
  },
  methods:{
    handleCur(){
      //子传父 通知父组件执行一个名为 cur 的自定义事件 @cur="函数"
      this.$emit('cur',10)
    }
  }
}
</script>