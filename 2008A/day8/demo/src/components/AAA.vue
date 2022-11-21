<template>
  <div>
    <button @click="handleAAA"> AAA </button>
  </div>
</template>

<script>
import toastMixins from '@/minxins/toastMixins'; "@/minxins/toastMixins"
export default {
    methods:{
        handleAAA(){
            this.Toast('我是 AAA')
            // this.$toast('我是 AAA')
        }
    },
    mixins:[ toastMixins ]
}
</script>

<style>

</style>