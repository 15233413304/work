<template>
  <div>
    <!-- 传给子组件 -->
    <goods-list 
    :good-list="list" 
    :good-total="total"
    @pageClear="pageClear"
    @pageAdd="pageAdd"/>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList.vue';
export default {
  data(){
    return {
      list:[],
      pageInfo:{
        page:1,
        pageSize:40,
      },
      total:0,
    }
  },
  components:{
    GoodsList
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.$http.get('/api/list', {params: {...this.pageInfo}}).then(res=>{
        this.list = res.list
        this.total = res.total
      })
    },
    pageAdd(){
      this.pageInfo.page++
      this.getList()
    },
    pageClear(){
      this.pageInfo.page = 0
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>