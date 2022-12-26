<template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" left-arrow   @click-left="$router.back()"/>
    <van-grid :border="false" :column-num="1">
        <van-grid-item>
            <van-image :src="detailData.img" />
            <p>{{ detailData.name }}</p>
            <p>{{ detailData.price }}</p>
        </van-grid-item>
    </van-grid>

    <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.shopCount" @click="$router.push('/cart')"/>
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" @click="delStar" v-if="isStar"/>
        <van-goods-action-icon icon="star-o" text="收藏" @click="addStar" v-else/>
        <van-goods-action-button type="warning" text="加入购物车" @click="handleShop"/>
    </van-goods-action>
  </div>
</template>

<script>
export default {
    computed:{
        detailData(){
            // 获取到vuex state中的 homeList列表
            let list = this.$store.state.homeList
            // 根据 params传过来的id 筛选出当前页面的数据 
            return list.find(item => item.id == this.$route.params.id)
        },
        // 收藏状态
        isStar(){
            return this.$store.state.starList.includes(this.$route.params.id)
        }
    },
    methods:{
        // 点击加入购物车
        handleShop(){
            this.$store.commit('setCartList', this.detailData)
        },
        // 点击收藏
        addStar(){
            this.$store.commit('setStarList',{id:this.$route.params.id,type:true})
        },
        // 取消收藏
        delStar(){
            this.$store.commit('setStarList',{id:this.$route.params.id,type:false})
        }
    }
}
</script>

<style>

</style>