<template>
  <van-grid-item>
    <van-image
        round
        width="5rem"
        height="5rem"
        :src="imgUrl"
    />
    <p>{{itemData.goods}}</p>
    <p>{{itemData.price}}</p>
  </van-grid-item>
</template>

<script>
export default {
    props:{
        itemData:{
            type:Object,
            default:()=> {}
        }
    },
    data(){
        return{
            imgUrl:'https://img01.yzcdn.cn/vant/cat.jpeg'
        }
    },
    mounted(){
        setTimeout(() => {
            this.imgUrl = this.itemData.url
        }, 1000);
    }
}
</script>

<style>

</style>