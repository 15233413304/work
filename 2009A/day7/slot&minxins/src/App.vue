<template>
  <div>
    <base-child v-for="item in list" :key="item.id" :data="item">
    <!-- 默认插槽 -->
      <!-- <template>
        {{item.msg}}  
      </template> -->
      <!-- <template v-slot:default>
        {{item.msg}}  
      </template> -->

      <!-- 具名/命名插槽 -->
      <!-- <template v-slot:msg>
        <h1>标题：{{item.msg}} </h1> 
      </template>
      <template v-slot:name>
        <h2>姓名：{{item.name}}</h2>
      </template>
      <template v-slot:age>
        <h3>年龄：{{item.age}}</h3>
      </template> -->
      <!-- 插槽的 v-slot: 可以缩写成 # -->
      <!-- <template #msg>
        <h1>标题：{{item.msg}} </h1> 
      </template>
      <template #name>
        <h2>姓名：{{item.name}}</h2>
      </template>
      <template #age>
        <h3>年龄：{{item.age}}</h3>
      </template>
      <template #time>
        <h3>时间：{{item.time}}</h3>
      </template> -->

      <!-- 作用域插槽 -->
      <template #msg="scope">
        <h1>标题：{{scope.msg}} </h1> 
      </template>
      <template #name="scope">
        <h2>姓名：{{scope.slotName}}</h2>
      </template>
      <template #age="scope">
        <h3>年龄：{{scope.age}}</h3>
      </template>
      <!-- <template #time="scope">
        <h3>时间：{{Timer(scope.time)}}</h3>
      </template> -->
      <!-- 在默认插槽中使用作用域传值 -->
      <template #default="scope">
        <h3>时间：{{Timer(scope.time)}}</h3>
      </template>
    </base-child>
  </div>
</template>

<script>
import BaseChild from '@/components/BaseChild.vue'
import timeMinxins from '@/minxins/time'
export default {
  components:{
    BaseChild
  },
  data(){
    return{
      list:[
        {
          id:'1',
          msg:'hello',
          name:'张三',
          age:'20',
          time: +new Date()
        },
        {
          id:'2',
          msg:'hello',
          name:'李四',
          age:'20',
          time: +new Date() +20000
        },
        {
          id:'3',
          msg:'hello',
          name:'王五',
          age:'20',
          time: +new Date() +40000
        },
      ],
      
    }
  },
  // 如果组件中有 和mixins同名的函数或属性 会优先使用组件的
  // 如果没有 和mixins同名的函数或属性 会使用minxins混入的函数或属性
  // minxins 中也有生命周期 如果组件也有使用生命周期 minxins会先执行
  mixins:[timeMinxins],
  methods:{
    // Timer(time){
    //   return time
    // }
  },
  beforeCreate() {
      console.log('app-beforeCreate')
        
  },
  created(){
      console.log('app-create')
  },
  beforeMount() {
     console.log('app-beforeMount')
  },
  mounted() {
     console.log('app-mounted')
  },
}
</script>

<style>

</style>