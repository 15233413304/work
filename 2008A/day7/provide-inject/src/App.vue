<template>
  <div class="app">
    学校：{{message.school}}
    <!-- 父传子 -->
    <!-- <my-college :collegeMsg="college" :classMsg="classRoom"/> -->

    <my-college/>

    <button @click="handleChange">改变数据</button>
  </div>
</template>

<script>
// 引入组件
import { MyCollege } from '@/components'
export default {
  components:{
    // 组册组件
    MyCollege
  },
  data(){
    return{
      message:{
        school:"八维",
        college:"网站工程学院",
        classRoom:"2008A"
      }
      
    }
  },
  // 通过provide 提供数据 状态
  provide(){
    // let that = this
    return {
      // 提供一个data里的对象可以实现响应式
      // message:this.message
      // 提供一个函数 实现响应式
      // college(){
      //   return that.message.college
      // },
      // classRoom(){
      //   return that.message.classRoom
      // }
      college:()=>{
        return this.message.college
      },
      classRoom:()=>{
        return this.message.classRoom
      }
      // 直接提供过去值 无响应
      // college: this.message.college,
      // classRoom: this.message.classRoom
    }
  },
  methods:{
    handleChange(){
      this.message.college = "网站工程"
      this.message.classRoom = '08A'
    }
  }
}
</script>

<style>

</style>