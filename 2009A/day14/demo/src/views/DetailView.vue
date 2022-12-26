<template>
  <div>
    <van-grid :border="false" :column-num="1">
      <van-grid-item>
        <van-image :src="detailData.img" lazy-load/>
        <p>{{ detailData.name }}</p>
        <p>{{ detailData.price }}</p>
      </van-grid-item>
    </van-grid>

    <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.cartCount" @click="$router.push('/cart')"/>
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" @click="cancleStar" v-if="isStar"/>
        <van-goods-action-icon icon="star-o" text="收藏" @click="addStar" v-else/>
        <van-goods-action-button type="warning" text="加入购物车" @click="handleShop"/>
    </van-goods-action>
  </div>
</template>

<script>
export default {
    computed:{
        detailData(){
            // 获取vuex中 state下的homeList  拿到所有商品数据
            let list = this.$store.state.homeList
            // 筛选出和params参数传过来的id 一致的那一项
            return list.find(item=> item.id == this.$route.params.id)
        },
        isStar(){
            // 判断vuex starList中有没有这个详情页的id  如果有 retrun 一个true  没有false
            return this.$store.state.starList.includes(this.$route.params.id)
        }
    },
    methods:{
        // 点击加入购物车 触发的函数
        handleShop(){
            // 调用vuex中 同步的方法 setCartList
            this.$store.commit('setCartList',this.detailData)
        },
        // 点击收藏
        addStar(){
            this.$store.commit('setStarList',{type:true,id:this.$route.params.id})
        },
        //点击取消收藏
        cancleStar(){
            this.$store.commit('setStarList',{type:false,id:this.$route.params.id})
        }
    }
}
</script>

<style>

</style>