<template>
  <div>
    <nav-bar title="详情页" hasLeft="true" left-text="返回" showArrow="true" @click-left="$router.back()"/>
    <!-- {{ detailData }} -->
    <!-- 轮播图 -->
    <van-swipe 
        v-if="detailData.detailImg"
        class="my-swipe" 
        :autoplay="3000" 
        indicator-color="white"
        @change="(index)=> current = index"
        >
        <van-swipe-item v-for="(item,index) in detailData.detailImg" :key="index">
            <van-image lazy-load :src="item"></van-image>
        </van-swipe-item>
        <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ detailData.detailImg.length }}</div>
        </template>
    </van-swipe>
    <div class="info">
        <h3>{{ detailData.name }}</h3>
        <p>{{ detailData.price }}¥</p>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            detailData:{},
            current: 0,
        }
    },
    created(){
        // 接受 穿过来的参数需要通过 this.$route方法
        // console.log(this.$route.query.id)
        this.getDetail(this.$route.params.id)
    },
    methods:{
        getDetail(id){
            this.$http.get('/api/detail',{params:{id}}).then(res=>{
                this.detailData = res
            })
        }
    }
}
</script>

<style lang="scss">
    .van-swipe{
        background: #f5f5f5;
        &-item{
            text-align: center;
        }
    }
    .custom-indicator {
        position: absolute;
        right: 38px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
    .info{
        background: #f5f5f5;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        margin: 20px auto;
        width: 330px;
        p{
            color: red;
        }
    }
</style>