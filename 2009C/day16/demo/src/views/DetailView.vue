<template>
  <div>
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in detailData.banner" :key="index">
            <img v-lazy="image" />
        </van-swipe-item>
    </van-swipe>
    <van-card
        :price="`${detailData.price}.00`"
        :desc="detailData.desc"
        :title="detailData.name"
        :thumb="detailData.img"
        >
    </van-card>
    <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters['shop/shopCount']" />
        <van-goods-action-icon 
            v-if="starList.includes($route.params.id)"
            icon="star" text="已收藏" color="#ff5000" 
            @click="offStar"
        />
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
            //获取到vuex中 首页的列表
            let list = this.$store.state.home.homeList;
            // 从首页列表中筛选出 id为路由携带参数的 这一项
            return list.find(item=> item.id == this.$route.params.id)
        },
        starList(){
            // console.log(this.$store.state)
            return this.$store.state.home.starList
        }
    },
    methods:{
        // 点击收藏按钮
        onStar(){
            //调用home模块下 同步（mutations里）的setOnStar方法  
            this.$store.commit('home/setOnStar',this.$route.params.id)
        },
        // 取消收藏
        offStar(){
            //调用home模块下 同步（mutations里）的setOffStar方法  
            this.$store.commit('home/setOffStar',this.$route.params.id)
        },
        // 点击加入购物车按钮
        handleShop(){
            this.$store.commit('shop/setShopList',this.detailData)
        }
    }
}
</script>

<style>

</style>