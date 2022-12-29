<template>
  <div class="outline">
    <van-nav-bar title="网络错误"/>
    <!-- 网络错误 -->
    <van-empty image="network" description="网络错误，请稍后重试">
      <h4 @click="handleRefetch">点击重试</h4>
    </van-empty>
  </div>
</template>


<script>
import { Toast } from 'vant'
export default {
  methods:{
    handleRefetch(){
      // 判断当前设备有无网络
      if(window.navigator.onLine){
        //有网络的情况 跳转回之前的页面
        Toast.success('网络重新连上来了，嗷嗷～')
        return this.$router.replace(`${localStorage.onlineRouter}`)
      }
      //没网络的时候 提示
      Toast.fail('还是没网，等会再试试吧～')
    }
  }
}
</script>

<style lang="stylus">
.outline
  text-align center
</style>