<template>
  <div>
    <van-nav-bar 
     :title="$route.meta.title" />
    <!-- 网络错误 -->
    <van-empty image="network" description="网络连接异常，请重试">
        <p @click="handleRefetch">点击重试</p>
    </van-empty>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    methods:{
        handleRefetch(){
            // 判断现在有没有网络
            if(window.navigator.onLine){
                //有网络 跳回之前的页面 并提示
                this.$router.push(`${localStorage.online}`)
                return Toast.success('网络恢复了，嗷嗷～')
            }
            // 没有网络 不做任何操作 仅提示
            Toast.fail('还是没网络，一会再试试吧～')
        }
    }
}
</script>

<style>

</style>