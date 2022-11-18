<template>
  <div class="app">
    <!-- <Child :slotValue="slotValue"/> -->


    <Child>
      <!-- 默认插槽 -->
      <!-- <template>
        <h1>{{slotValue}}</h1>
        <h1>{{userName}}</h1>
        <h1>{{userAge}}</h1>
      </template> -->
      <!-- <template v-slot:default>
        <h1>{{slotValue}}</h1>
        <h1>{{userName}}</h1>
        <h1>{{userAge}}</h1>
      </template> -->

      <!-- 命名插槽/具名插槽 -->
      <!-- <template v-slot:title>  
        <p>{{slotValue}}</p>
      </template>
      <template v-slot:user>
        <p>{{userName}}</p>
      </template>
      <template v-slot:age>
        <p>{{userAge}}</p>
      </template> -->
      <!-- 命名插槽的v-slot  可以缩写成#  -->
      <!-- <template #title>
        <p>{{slotValue}}</p>
      </template>
      <template #user>
        <p>{{userName}}</p>
      </template>
      <template #age>
        <p>{{userAge}}</p>
      </template> -->

      <!-- 作用域插槽 -->
      <template>
        <p>{{slotValue}}</p>
      </template>
      <template #user="scoped">
        <p>{{userName}}</p>
        {{scoped.slotName}}
      </template>
      <template #age="scoped">
        <p>{{userAge}}</p>
        {{scoped.slotAge}}

      </template>
      
    </Child>
  </div>
</template>

<script>
import Child from '@/components/Child.vue';
export default {
  components:{
    Child
  },
  data(){
    return{
      slotValue:'新增用户',
      userName:'张三',
      userAge: 20
    }
  }
}
</script>

<style>

</style>