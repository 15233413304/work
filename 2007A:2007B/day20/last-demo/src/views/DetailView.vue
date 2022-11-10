<template>
  <div>
    <!-- 商品详情 -->
    <van-image lazy-load width="100" height="100" :src="detailData.img">
      <template v-slot:error>加载失败</template>
    </van-image>
    <h4>
      {{ detailData.title }} <span class="price">¥{{ detailData.price }}</span>
    </h4>
    <p class="con">{{ detailData.content }}</p>

    <!-- 商品导航 -->
    <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服"/>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.shopCount" to="/shop"/>
        <van-goods-action-icon icon="shop-o" text="店铺"/>
        <van-goods-action-icon icon="star-o" text="收藏" v-if="!isStar" @click="handleStar"/>
        <van-goods-action-icon icon="star" text="已收藏" color="red" v-else @click="handleStar"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="handleShop"/>
        <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

  </div>
</template>
<script>
export default {
  computed: {
    detailData() {
      // 获取到商品列表
      let list = this.$store.state.list;
      return list.find((item) => item.id == this.$route.params.id);
    },
    // 当前商品是否收藏
    isStar(){
        return this.$store.state.starList.includes(this.detailData.id)
    }
  },
  methods:{
    // 点击收藏/取消收藏
    handleStar(){
        // 如果已收藏 点击变成取消
        if(this.isStar){
           return this.$store.commit('clickUnStar',this.detailData.id)
        }
        // 未收藏 点击变成收藏
        this.$store.commit('clickStar',this.detailData.id)
    },
    // 点击加入购物车
    handleShop(){
        this.$store.commit('clickShop',{...this.detailData,count:1})
    }
  }
};
</script>
<style>
</style>