<template>
  <div class="app">
    <my-table :table-data="dataList"/>
  </div>
</template>
<script>
  import MyTable from '@/components/MyTable.vue'
  export default {
    components:{
      MyTable
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        dataList: []
      }
    },
    async created(){
      this.dataList = await this.$http.get('/api/list')
    }
  }
</script>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .app{
    .el-table{
      margin: 10px auto;
    }
  }
</style>