<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in detailData.banner" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <van-card
      :price="detailData.price + '.00'"
      :desc="detailData.desc"
      :title="detailData.name"
      :thumb="detailData.img"
    />
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters['cart/shopCount']" />
      <van-goods-action-icon v-if="$store.state.home.starList.includes($route.params.id)" icon="star" text="已收藏" color="#ff5000" @click="offStar"/>
      <van-goods-action-icon v-else icon="star-o" text="收藏" @click="onStar"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="handleShop"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  computed:{
    detailData(){
      let list = this.$store.state.home.homeList
      let { id } = this.$route.params
      return list.find(item=> item.id == id)
    }
  },
  methods:{
    // 收藏
    onStar(){
      let { id } = this.$route.params
      this.$store.commit('home/setOnStar',id)
    },
    // 取消收藏
    offStar(){
      let { id } = this.$route.params
      this.$store.commit('home/setOffStar',id)
    },
    // 加入购物车
    handleShop(){
      this.$store.commit('cart/addShop',this.detailData)
    }
  }
}
</script>

<style>

</style>