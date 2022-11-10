<template>
  <div class="app">
    
  </div>
</template>

<script>
import axios from '@/axios/axios'
export default {
  data(){
    return {
      list:[]
    }
  },
  created(){
    axios.get('/list').then(res =>{
      // console.log(res.data)
      this.list = res.data
    })
  },
  mounted(){

  }
}

</script>

<style>

</style>