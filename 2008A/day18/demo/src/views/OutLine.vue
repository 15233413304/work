<template>
  <div @click="handleReload">
    <van-empty image="network" description="网络连接失败，点击重试"/>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    methods:{
        handleReload(){
            if(window.navigator.onLine){
              return this.$router.replace(`${localStorage.onlineRouter}`)
            }
            Toast.fail('还是没网，太难了...')
        }
    }
}
</script>

<style>

</style>