<template>
  <div>
    <!-- 通过自定义属性  传过去一个message  list-->
    <HelloVue :msg="message" :arr="list" />
    <TheChildren :msg="message"/>
  </div>
</template>

<script>
// 引入组件  可以使用@/ 来代替 ../src/
import HelloVue from '@/components/HelloVue.vue'
       
export default {
  // 局部注册组件
  components: {
    HelloVue
  },
  data(){
    return{
      message:'我传过去一个值',
      list:[
        {
          name:'张三',
          age:18
        },
        {
          name:'李四',
          age:19
        },
        {
          name:'王五',
          age:20
        },
      ]
    }
  }

}

</script>

<style>

</style>