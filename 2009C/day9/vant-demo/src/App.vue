<template>
  <div>
    <!-- 缓存组件 -->
    <keep-alive>
      <shop-list 
        :good-list="list"
        :good-total="total"
        @addpage="AddPage"
        @clearpage="pageInfo.page = 0"
      />
    </keep-alive>
    
  </div>
</template>

<script>
import ShopList from '@/components/ShopList.vue'
export default {
  components:{
    ShopList
  },
  data(){
    return{
      // 商品列表的数据
      list:[],
      pageInfo:{
        page:1,
        pageSize:10,
      },
      // 总数据条数
      total:0
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.$http.get('/api/list', { params: {...this.pageInfo}}).then(res=>{
        this.list = res.list
        this.total = res.total
      })
    },
    AddPage(){
      this.pageInfo.page++
      this.getList()
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