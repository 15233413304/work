<template>
  <!-- 可以使用 CellGroup 作为容器 -->
  <div>
    <filter-input @searchFn="clickSearch" @noSearch="state.searchValue = ''"/>
    <van-grid :column-num="2">
     <grid-item v-for="item in searchList" :key="item.id" :itemData="item"/> 
    </van-grid>
  </div>
</template>

<script setup>
import http from '@/utils/http'
import GridItem from '@/components/GridItem.vue'
import FilterInput from '@/components/FilterInput.vue'
import { computed, reactive } from 'vue';
  const state = reactive({
    searchValue:'',
    list:[]
  })

  const searchList = computed(()=>{
    if(state.searchValue.length){
      return state.list.filter(item=> item.goods.includes(state.searchValue))
    }
    return state.list
  })

  const fetchList = async () =>{
    state.list =await http.get('/api/list')
  }
  fetchList()

  const handleChange = () =>{
    console.log(state.searchValue)
  }

  const clickSearch = (value)=> {
    state.searchValue = value
  }

</script>

<style>

</style>