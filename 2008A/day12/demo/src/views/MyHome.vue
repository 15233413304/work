<template>
  <div class="home">
    <van-grid :column-num="4">
      <van-grid-item v-for="value in list" :key="value.id" @click="handleToDetail(value.id)">
        <van-image
          width="70"
          height="70"
          :src="value.img"
          round
          lazy-load
        >
          <template v-slot:error>
            <!-- 加载失败时展示一张本地资源的 图片 -->
            <van-image :src="errorImg"/>
          </template>
        </van-image>
        <p>{{value.name}}</p>
        <p class="price">{{value.price}}￥</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import errorImg from  '@/assets/load_error.gif'
export default {
  data(){
    return{
      errorImg,
      list:[]
    }
  },
  async created(){
    this.list = await this.$axios.get('/api/list')
    // 通过本地存储储存数据
    localStorage.setItem('list',JSON.stringify(this.list))
  },
  methods:{
    handleToDetail(id){
      // this.$router.push('/detail')
      // 使用query传参
      // this.$router.push(`/detail?id=${id}`)
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     id,
      //   }
      // })

      // 使用params传参
      // this.$router.push(`/detail/${id}`)

      this.$router.push({
        name:'MyDetail',
        params:{
          id,
        }
      })

    }
  }
}
</script>

<style lang="scss">
.home{
  height: 100%;
  .price{
    color: red;
  }
}
</style>