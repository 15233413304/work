<template>
  <div>
    <van-nav-bar 
        :title="$route.meta.title" 
        left-arrow
        left-text="返回"
        @click-left="$router.go(-1)"
    />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in detailData?.banner" :key="index">
            <img v-lazy="image" />
        </van-swipe-item>
    </van-swipe>
    <!-- 商品详情 -->
    <van-card
        :price="`${detailData?.price}.00`"
        :desc="detailData?.desc"
        :title="detailData?.name"
        :thumb="detailData?.img"
    />
    <!--  商品导航 -->
    <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.shopCount" @click="$router.push('/cart')"/>
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" 
            v-if="isStar" @click="delStar"/>
        <van-goods-action-icon icon="star-o" text="收藏" 
            v-else @click="createStar"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="handleShop"/>
        <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
    computed:{
        detailData(){
            return this.$store.state.homeList.find(item=> {
                return item.id == this.$route.params.id
            })
        },
        isStar(){
            return this.$store.state.starList.includes(this.$route.params.id)
        }
    },
    methods:{
        // 调用vuex中同步的方法 来添加到收藏列表中
        createStar(){
            this.$store.commit('createStar',this.$route.params.id)
        },
        // 调用vuex中同步的方法 取消收藏
        delStar(){
            this.$store.commit('delStar',this.$route.params.id)
        },
        // 调用vuex中同步的方法 加入购物车
        handleShop(){
            // 通知vuex执行 addShop 将详情页的商品传递过去
            this.$store.commit('addShop',this.detailData)
        }

    }
}
</script>

<style>

</style>