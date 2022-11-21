<template>
  <div class="app">
    <filter-input @searchFn="clickSearch" @noSearch="searchValue = ''"/>
    <van-grid :column-num="2">
      <!-- 使用组件 -->
      <grid-item v-for="item in searchList" :key="item.id" :itemData="item"/>
    </van-grid>
  </div>
</template>

<script>
// 引入组件
import GridItem from '@/components/GridItem.vue';
import FilterInput from '@/components/FilterInput.vue';
import http from '@/utils/http'
export default {
  data(){
    return{
      list:[],
      searchValue:""
    }
  },
  computed:{
    searchList(){
      if(this.searchValue.length){
        return this.list.filter(item=> item.goods.includes(this.searchValue))
      }
      return this.list
    }
  },
  // 注册组件
  components:{
    GridItem,
    FilterInput,
  },
  // created(){
  //   http.get('/api/list').then(res=>{
  //     console.log(res)
  //     this.list = res
  //   })
  // },
  async created(){
    this.list = await http.get('/api/list')
  },
  methods:{
    clickSearch(value){
      this.searchValue = value
    }
  }
}
</script>

<style>

</style>