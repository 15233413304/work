<template>
  <div>
    <button @click="handleBtn">别点我</button>
    <AAA/>
  </div>
</template>

<script>
import AAA from '@/components/AAA.vue'
import toastMixins from '@/minxins/toastMixins'
export default {
  components:{
    AAA
  },
  mixins:[toastMixins],
  methods:{
    handleBtn(){
      let { Toast } = this
      Toast('我点了又如何')
    },
    // Toast(title){
    //   console.log(title)
    // }
  },
  beforeCreate() {
        console.log('我是App的beforeCreate')
    },
    created(){
        console.log('我是App的created')
    },
    beforeMount() {
        console.log('我是App的beforeMount')
    },
    mounted() {
        console.log('我是App的mounted') 
    },
  
}
</script>

<style>

</style>