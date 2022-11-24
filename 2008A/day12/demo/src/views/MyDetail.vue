<template>
  <div>
    <van-image
     width="150"
     height="150"
     :src="detailData.img"/>
    <p>商品名：{{detailData.name}}</p>
    <p>价格：{{detailData.price}}￥</p>
    <!-- {{detailData}} -->
  </div>
</template>

<script>
export default {
    computed:{
        detailData(){
            // 接受query传过来的参数
            // let { id } = this.$route.query
            // 接受params传过来的参数
            let { id } = this.$route.params
            let list = JSON.parse(localStorage.list)
            return list.find(item => item.id == id)
        }
    },
    created(){
        console.log(this.$route)
        // console.log(JSON.parse(localStorage.list))
    }
}
</script>

<style>

</style>