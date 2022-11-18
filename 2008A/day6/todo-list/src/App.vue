<template>
  <div>
    <MyInput @addJob="addAJob"/>
    <!-- 通过动态属性传递过去一个列表 -->
    <MyContent :list="list" @toFinsh="handleFinish"/>
  </div>
</template>

<script>
import axios from '@/axios/axios'
import { MyContent, MyInput } from '@/components'
import {v4 as uuid} from 'uuid'
export default {
  components: { 
    MyContent,
    MyInput 
  } ,
  data(){
    return {
      list: []
    }
  },
  methods:{
    async fetchList(){
      this.list = await axios.get('/api/list')
      this.list.forEach(item=>{
        item.id = uuid()
      })
    },
    // fetchList(){
    //   axios.get('/api/list').then(res=>{
    //     this.list = res
    //   })
    // }
    // 添加一个任务
    addAJob(job){
      // console.log(job)
      // {
      //   title: job.title,
      //   isDo: job.isDo,
      //   id: uuid()
      // }
      this.list.push({...job,id:uuid()})
    },
    // 完成一个任务
    handleFinish(id){
      let index = this.list.findIndex(item=> item.id == id)
      this.list[index].isDo = true
    }
  },
  created(){
    this.fetchList()
  }
}
</script>

<style>

</style>