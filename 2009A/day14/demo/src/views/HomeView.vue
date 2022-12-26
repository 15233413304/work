<template>
  <div>
    <van-grid :border="false" :column-num="2">
      <van-grid-item v-for="item in list" :key="item.id" @click="handleDetail(item.id)">
        <van-image :src="item.img" lazy-load/>
        <p>{{ item.name }}</p>
        <p>{{ item.price }}</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  computed:{
    list(){
      return this.$store.state.homeList
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      // 调用vuex actions 中的 getList函数
      this.$store.dispatch('getList')
    },
    handleDetail(id){
      // 通过params传参方式 跳转详情
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style>

</style>