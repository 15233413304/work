<template>
  <div v-if="submitShop.length">
    <van-card 
      v-for="item in submitShop"
      :key="item.id"
      :num="item.count"
      :price="item.price + '.00'"
      :title="item.title"
      :thumb="item.img"
    />
    <van-steps :active="active">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
  </div>
  <van-empty
    v-else
    class="custom-image"
    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
    description="暂无购买商品，快去剁手吧～"
  />
</template>

<script>
// import { mapState } from 'vuex';
export default {
  data(){
    return {
      active:1
    }
  },
  computed:{
    // ...mapState(['submitShop']),
    submitShop(){
      return this.$store.state.submitShop
    }
  }
}
</script>

<style>

</style>