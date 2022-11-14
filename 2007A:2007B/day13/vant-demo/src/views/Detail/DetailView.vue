<template>
  <div>
    <nav-bar :tit="'商品详情'" :showLeft="true" :leftText="'返回'" @back="$router.back()"/>
    <van-image :src="detailData.img" />
    <p class="name">{{detailData.name}}</p>
    <p class="price">¥{{detailData.price}}</p>
  </div>
</template>

<script>
import getList from '@/mixins/getList';
export default {
    data(){
        return{
            detailData: {}
        }
    },
    mixins: [getList],
    created(){
        // console.log(this.$route.query)
        // this.detailData = this.$route.query
        // query接收参数
        // this.getDetail(this.$route.query.id,this.$route.query.tab)
        // params接收参数
        let { id, tab} = this.$route.params
        this.getDetail(id,tab)
    }
}
</script>

<style>
.name{
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>