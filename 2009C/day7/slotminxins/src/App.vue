<template>
  <div>
    <base-child v-for="item in list" :key="item.id" :data="item">
    <!-- 默认插槽 -->
      <!-- <template>
        <p>{{item.name}}</p>
        <p>{{item.age}}</p>
        <p>{{item.time}}</p>
      </template> -->
      <!-- 默认插槽也有名字 只是可以省略 默认名是default -->
      <!-- <template #default>
        <p>{{item.name}}</p>
        <p>{{item.age}}</p>
        <p>{{item.time}}</p>
      </template> -->

    <!-- 命名插槽 -->
    <!-- <template v-slot:user >
      <p> 姓名：{{item.name}}</p>
    </template>
    <template v-slot:age >
      <p>年龄：{{item.age}}</p>
    </template>
    <template v-slot:time >
      <p>时间：{{item.time}}</p>
    </template> -->
    <!-- 具名插槽可以将 v-slot: 缩写成#  -->
    <!-- <template #user >
      <p> 姓名：{{item.name}}</p>
    </template>
    <template #age >
      <p>年龄：{{item.age}}</p>
    </template>
    <template #time >
      <p>时间：{{item.time}}</p>
    </template> -->

    <!-- 作用域插槽 拿不到item的情况下需要使用插槽 -->
    <template #user="scope" >
      <p> 姓名：{{scope.rowData.name}}</p>
    </template>
    <template #age="scope" >
      <p>年龄：{{scope.rowData.age}}</p>
    </template>
    <template #time="scope" >
      <p>时间：{{Timer(scope.rowData.time)}}</p>
    </template>
    
    </base-child>
  </div>
</template>

<script>
import BaseChild from '@/components/BaseChild.vue'
import axios from 'axios'
import timeMinxin from '@/minxins/timeMinxin'
export default {
  components:{
    BaseChild
  },
  data(){
    return{
      list:[]
    }
  },
  // 如果说 有些函数一定会频繁使用时可以使用 minxins混入函数到实例中
  // mixins混入的生命周期会比组件的生命周期先执行
  // 如果 组件中的函数名或数据名 和 minxins中的函数名或数据名一样 那么优先使用组件中的
  // 组件中没有对应的函数 或 数据时 才会用minxins中混入的方法
  mixins:[timeMinxin],
  beforeCreate() {
      console.log('app-beforeCreate')
  },
  // created(){
  //   console.log('app-created')
  //   axios.get('/api/list').then(res=>{
  //     this.list = res.data
  //   })
  // },
  async created(){
      console.log('app-created')
      let res = await axios.get('/api/list')
      this.list = res.data
  },
  beforeMount() {
      console.log('app-beforeMount')
  },
  mounted() {
      console.log('app-mounted')
  },
  
  methods:{
    // Timer(time){
    //   console.log(time)
    //   return '2022'
    // }
  }
}
</script>

<style>

</style>