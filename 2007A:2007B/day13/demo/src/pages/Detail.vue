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
        <h4>商品名：{{detailData.name}}</h4>
        <p>价格：{{detailData.price}}</p>
    </div>
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
    },
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
  
</style>