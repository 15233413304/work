<template>
  <!-- 5。删除没用的文件 和内容 写一个div 根节点  所有内容都写在一个根节点里-->
  <div class="container">
    <!-- 标题 -->
    <h3>购物车</h3>
    <!-- 8.使用table组件 -->
    <!-- 12.当数组有数据才使用组件 -->
    <!-- 13.将数据通过自定义属性传递过去 -->
    <MyTable v-if="list.length" :list="list"/>
  </div>
</template>

<script>
// 6.引入组件
import MyTable from '@/components/MyTable.vue'
// 9.引入axios 请求数据
import request from '@/request/request'
export default {
  components:{
    // 7.组册组件
    MyTable
  },
  // 11.定义data里的list 存储数据
  data(){
    return {
      list:[]
    }
  },
  created(){
    // 10.请求接口
    request.get('/api/list').then(res=>{
      // 12. 赋值给data里的list
      this.list = res
    })
  }
}
</script>

<!-- lang="scss" 可以用scss预处理器编译css  也就是可以用scss了 -->
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .container{
    // 最外层盒子宽度
    width: 800px;
    // 居中
    margin: auto;
    h3{
      // 文字居中
      text-align: center;
      border-bottom: 1px solid;
    }
  }
</style>