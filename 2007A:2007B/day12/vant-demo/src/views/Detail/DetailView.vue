<template>
  <div>
    <nav-bar :tit="'商品详情'" :showLeft="true" :leftText="'返回'" @back="$router.back()"/>
    <van-image :src="detailData.img" />
    <p>{{detailData.name}}</p>
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
        // this.getDetail(this.$route.query.id,this.$route.query.tab)

        this.getDetail(this.$route.params.id,this.$route.params.tab)
    }
}
</script>

<style>

</style>