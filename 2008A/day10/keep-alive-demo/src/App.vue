<template>
  <div class="app">
    <button @click="handleA"> A </button>
    <button @click="handleB"> B </button>
    <!-- 使用组件 -->

    <!-- 使用v-if 做tab切换 组件第一次只会加载显示的 然后切换时加载切换的组件 销毁切换前的组件 -->
    <!-- <first-compon v-if="!showIndex"/>
    <second-compon v-else/> -->


    <!-- 使用v-show 做tab切换 组件会第一次全部加载 然后不再销毁 -->
    <!-- <first-compon v-show="!showIndex"/>
    <second-compon v-show="showIndex"/> -->


    <!-- 缓存组件 -->
    <!-- 使用keep-alive 缓存组件 第一次会加载对应的组件 然后切换的时候会加载切换的组件 并缓存 -->
    <keep-alive>
      <first-compon v-if="!showIndex"/>
      <second-compon v-else/>
    </keep-alive>
  </div>
</template>

<script>
//引入组件
import FirstCompon from '@/components/FirstCompon.vue';
import SecondCompon from '@/components/SecondCompon.vue';
export default {
  data(){
    return{
      showIndex: 0,
    }
  },
  // 注册组件
  components: { FirstCompon,SecondCompon },
  methods:{
    handleA(){
      this.showIndex = 0
    },
    handleB(){
      this.showIndex = 1
    }
  }
}
</script>

<style>

</style>