<template>
  <div class="detail">
    <nav-bar :navName="'商品详情'" :hasBack="true" @back="$router.go(-1)"/>
    <item-card :img="detail.img" :title="detail.title" :price="detail.price"/>
    <van-goods-action>
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        @click="handleShop"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="handleBuy"
      />
    </van-goods-action>
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    ItemCard,
    NavBar,
  },
  computed: {
    detail() {
      return this.$store.state.home.detail;
    },
  },
  methods: {
    handleBuy() {

    },
    handleShop() {
        this.$store.commit('shop/setShopList',this.detail)
    },
  },
};
</script>

<style>
.detail {
  text-align: center;
}
.van-image{
    margin-top: 20px;
}
</style>