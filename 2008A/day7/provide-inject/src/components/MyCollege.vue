<template>
  <div>
    学院：<!--{{collegeMsg}} -->
     <!-- 对象  -->
    <!-- {{message.college}} -->
    <!-- 函数 -->
    {{college()}}
    <!-- <my-class-room :classMsg="classMsg"/> -->

    <my-class-room/>

  </div>
</template>

<script>
// 引入子组件
import { MyClassRoom } from '@/components';
export default {
    components:{
        // 注册子组件
        MyClassRoom
    },
    // props接收父组件 动态的自定义属性 传过来的参数
    // props:{
    //     collegeMsg:{
    //         type:String,
    //     },
    //     classMsg:{
    //         type:String,
    //     }
    // },
    // inject:['message']
    inject:['college']
}
</script>

<style>

</style>