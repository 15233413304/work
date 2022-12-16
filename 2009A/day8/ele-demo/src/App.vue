<template>
  <div class="app">
    <user-table :list="list"/>
  </div>
</template>

<script>
import UserTable from '@/components/UserTable.vue';
export default {
  components:{
    UserTable,
  },
  data() {
      return {
        list: [],
        total:0
      }
  },
  provide(){
    return {
      total:()=>{
        return this.total
      }
    }
  },
  created(){
    this.$bus.$on('page',(data)=>{
      let { page, pageSize } = data
      this.$http.get('/api/table',{params:{ page, pageSize }}).then(res=>{
        this.list = res.list
        this.total = res.total
      })
    })
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
</style>