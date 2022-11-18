<template>
  <div>
    班级：<!-- {{classMsg}} --> 
    <!-- 对象 -->
    <!-- {{message.classRoom}} -->
    <!-- 函数 -->
    {{classRoom()}}
  </div>
</template>

<script>
export default {
    // props:{
    //     classMsg:{
    //         type:String,
    //     }
    // },
    // inject:['message'],
    inject:['classRoom']
}
</script>

<style>

</style>