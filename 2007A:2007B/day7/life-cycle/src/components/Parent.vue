<template>
  <div>
    父组件
    <hr>
    <!-- 父传子 通过自定义一个属性（:属性名） 属性的内容是我们要传过去的数据 （这个属性名要和子组件的props对应上） -->
    <Children :list="list" :idx="index"/>
  </div>
</template>

<script>
import Children from '@/components/Children.vue'
export default {
    data(){
        return{
            list: ['1','2','3','4'],
            index: 0,
        }
    },
    components:{
      Children
    }
}
</script>

<style>

</style>