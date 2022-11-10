<template>
  <div>
    <van-grid :column-num="2" v-if="list.length">
      <van-grid-item v-for="item in list" :key="item.id" @click="handleToDetail(item)">
        <van-image :src="item.img" />
        <p>{{item.name}}</p>
        <p class="price">¥{{item.price}}</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 引入minxins混入
import getList from '@/mixins/getList'

export default {
  data(){
    return {
      list:[]
    }
  },
  // 注册mixins 注册后就可以使用mixins里的任何方法
  mixins:[getList],
  created(){
    // 调tab1接口 this.$route获取到路由的path
    // console.log(this.$route)
    this.getList(this.$route.path)
    // axios.get('/api/list',{params:{url: this.$route.path}}).then(res=>{
    //   // console.log(res)
    //   this.list = res.data
    // })
  },
  methods:{
    handleToDetail(item){
      // console.log(item,{...item})

      // let { id, img, name, price } = item
      // 等价于
      // let id = item.id
      // let img = item.img
      // let name = item.name
      // let price = item.price
      // 键名和键值一致时 可以将 id:id 写成 id
      // {
      //   id:id,
      //   img:img,
      //   name:name,
      //   price:price
      // }
      

      // 路由传参有两种方式 query params
      // this.$router.push(`/detail?id=${item.id}&tab=1`)

      // this.$router.push({
      //   path:'/detail',
      //   // 通过query 传递一个id 和一个tab切换标识
      //   query:{id:item.id,tab:1}
      // })

      // 通过params传参
      // this.$router.push(`/detail/${item.id}/1`)
      
      this.$router.push({
        name:'detail',
        params:{
          id: item.id,
          tab: 1
        }
      })
    }


  }
}
</script>

<style>

</style>