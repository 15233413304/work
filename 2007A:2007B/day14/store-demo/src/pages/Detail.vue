<template>
  <div>
    <div class="banner">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" @change="(index)=> current = index">
        <van-swipe-item v-for="(image, index) in detailData.detailImg" :key="index">
            <img v-lazy="image" />
        </van-swipe-item>
        <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{detailData.detailImg?.length}}</div>
        </template>
        </van-swipe>
        <!-- 返回按钮 -->
        <van-icon name="arrow-left" @click="$router.back()"/>
    </div>
    <div class="content">
        <h4 class="title">商品名：{{detailData.name}}</h4>
        <p>价格：{{detailData.price}}</p>
    </div>
    <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" 
            :badge="$store.getters.shopCount"
            @click="$router.push('/shop')"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="goShopping"/>
        <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import axios from '@/axios/axios'
export default {
    data(){
        return{
            detailData:{},
            current: 0,
        }
    },
    created(){
        // $route 是获取路由参数用的
        // console.log(this.$route)
        // {
        //     id: this.$route.params.id,
        //     tab: this.$route.params.tab
        // }
        axios.get('/api/detail',{params:this.$route.params}).then(res=>{
            // console.log(res)
            this.detailData = res
        })
        // console.log(this.$store.state.curTab)
    },
    methods:{
        goShopping(){
            let { price,img,name,id } = this.detailData
            // 通知setCarList 将商品存放到vuex里的 carList中
            this.$store.commit('setCarList',{ price,img,name,id,count:1 })
        }
    }
}
</script>

<style lang="scss">
  .banner{
    position: relative;
    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
     }
     .van-icon{
        position: absolute;
        top: 5px;
        left: 5px;
        padding: 5px;
        border-radius: 50%;
        background: rgba(0,0,0,.4);
        color: white;
     }
  }
  .content{
    .title{
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
    }
  }
  
</style>