<template>
  <div id="app">
    <Left :title="dataList.leftTitle"/>
    <div class="content">
      <NavBar 
        :navList="dataList.nav" 
        :current="currentNav"
        @changeNav="navChange"
      />
      <List :list="list"/>
    </div>
    <Right :rightImg="dataList.rightImg"/>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import NavBar from '@/components/NavBar.vue'
import Right from '@/components/Right.vue'
import List from '@/components/List.vue'
import axios from 'axios'

export default {
  components:{
    Left,
    NavBar,
    Right,
    List
  },
  data(){
    return {
      dataList:{},
      // 顶部导航栏的默认下标
      currentNav: 0,
      list: []
    }
  },
  computed:{
    // 将总数据进行一个截取 返回截取后的数据
    // sliceList(){
    //   return this.dataList.list?.slice(this.currentNav*4,this.currentNav*4+4)
    // }
  },
  created(){
    axios.get('/list').then(res=>{
      this.dataList = res.data
      console.log(this.dataList)
    })
    this.navChange(this.currentNav)
  },
  methods:{
    navChange(idx){
      this.currentNav = idx
      axios.get('/slice/list',{params: {idx}}).then(res=>{
        this.list = res.data.list
      })
    }  
  }
};
</script>

<style lang="scss">
  #app{
    display: flex;
    justify-content: space-evenly;
    .right{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      max-height: 500px;
    }
  }
</style>
