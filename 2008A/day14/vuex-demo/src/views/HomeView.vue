<template>
  <div class="home-container">
    <van-grid :column-num="4">
      <van-grid-item v-for="item in list" :key="item.id" @click="handleItem(item.id)">
        <van-image
          fit="contain"
          round
          height="100"
          :src="item.img"
        />
        <p class="item-name">{{item.name}}</p>
        <p>{{item.price}}¥</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  created(){
    this.fetchList()
  },
  methods:{
    // 请求数据 并将返回的数据赋值给list
    fetchList(){
      // 调用 vuex中 actions里的函数
      this.$store.dispatch('getList').then(()=>{
        // 获取到vuex中 state里的 list
        this.list = this.$store.state.list
      })
    },
    handleItem(id){
      // 点击商品的某一项时 跳转到对应的详情页
      // params 传参
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  .item-name{
    max-width: 70px;
    // 溢出隐藏
    overflow: hidden;
    // 强制不换行
    white-space: nowrap;
    // 溢出显示...
    text-overflow: ellipsis;
  }
}
</style>