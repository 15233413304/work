<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in homeData.banner" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
    </div>       
    <!-- tab 切换 -->
    <van-tabs v-model="curTab">
        <van-tab title="日常">
            <!-- 列表1 -->
            <van-grid :border="false" :column-num="2">
                <van-grid-item 
                    v-for="item in homeData.tabList1" 
                    :key="item.id"
                    @click="handleDetail(item.id)"
                >
                    <van-image :src="item.img" />
                    <p>商品名：{{item.name}}</p>
                    <p>价格：{{item.price}}</p>
                </van-grid-item>
            </van-grid>
        </van-tab>
        <van-tab title="轻奢">
            <!-- 列表2 -->
            <van-grid :border="false" :column-num="2">
                <van-grid-item 
                    v-for="item in homeData.tabList2" 
                    :key="item.id"
                    @click="handleDetail(item.id)"
                >
                    <van-image :src="item.img" />
                    <p>商品名：{{item.name}}</p>
                    <p>价格：{{item.price}}</p>
                </van-grid-item>
            </van-grid>
        </van-tab>
        <van-tab title="大怨种">
            <!-- 列表3 -->
            <van-grid :border="false" :column-num="2">
                <van-grid-item 
                    v-for="item in homeData.tabList3" 
                    :key="item.id"
                    @click="handleDetail(item.id)"
                >
                    <van-image :src="item.img" />
                    <p>商品名：{{item.name}}</p>
                    <p>价格：{{item.price}}</p>
                </van-grid-item>
            </van-grid>
        </van-tab>
    </van-tabs>

    
    <!-- <img src="../assets/logo.png" /> -->
     <!-- <img  v-lazy="l"> -->
  </div>
</template>

<script>
import axios from '@/axios/axios'
// import l from '@/assets/logo.png'
export default {
    data(){
        return {
            homeData:{},
            // l,
            // 当前的tab切换下标
            curTab: 0,
        }
    },
    created(){
        axios.get('/api/list').then(res=>{
            console.log(res)
            this.homeData = res
        })
    },
    methods:{
        handleDetail(id){
            // query 传参  $router 跳转路由使用
            // this.$router.push(`/detail?id=${id}&tab=${tab}`)
            // this.$router.push({
            //     path:'/detail',
            //     query:{
            //         id,tab
            //     }
            // })

            // params 传参
            // this.$router.push(`/detail/${tab}/${id}`)
            // console.log(this.curTab)
            this.$router.push({
                name:'Detail',
                params:{
                    id,
                    tab: this.curTab
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.van-swipe{
    height: 100px;
    .van-swipe-item{
        display: flex;
        justify-content: center;
        background: skyblue;
        :deep(img){
            height: 100%;
        }
    }
}
</style>