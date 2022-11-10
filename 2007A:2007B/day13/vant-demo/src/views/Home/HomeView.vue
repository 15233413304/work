<template>
  <div class="home">
    <van-tabs v-model="active" sticky>
      <!-- <van-tab v-for="item in tabList" :key="item" :title="item">
          <router-view/>
      </van-tab> -->
        <van-tab :title="tabList[0]">
          <router-view v-if="active == 0"/>
        </van-tab>
        <van-tab :title="tabList[1]">
          <router-view v-if="active == 1"/>
        </van-tab>
        <van-tab :title="tabList[2]">
          <router-view v-if="active == 2"/>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active: 0,
      tabList:['日常','轻奢','大怨种']
    }
  },
  watch:{
    active:{
      handler(value){
        if(value == 0){
          if(this.$route.path!='/home/tab1'){
            return this.$router.push('/home/tab1')
          }
        }
        if(value == 1){
          if(this.$route.path!='/home/tab2'){
            return this.$router.push('/home/tab2')
          }
        }
        if(value == 2){
          if(this.$route.path!='/home/tab3'){
            return this.$router.push('/home/tab3')
          }
        }
      },
      // 是否首次进页面就执行watch
      immediate: true
    }
  },
}
</script>
<!-- scoped保证每个.vue组件里的样式 如果有同类名的不和其他的冲突 避免全局污染 -->
<!--  :deep() 深度选择器 可以穿透scoped并且不会全局污染 -->
<!-- >>> vue提供深度选择器写法 只能在 css 和 stylus中使用 less和scss/sass 不能使用 -->
<style lang="scss" scoped>
.home:deep(.van-sticky){
  top: 46px
}
:deep(.price){
  color: red;
}
// .home:deep(){
//   .van-sticky{
//     top: 46px
//   }
// }
</style>