<template>
  <div>
    <van-image
        lazy-load
        width="100"
        height="100"
        :src="img"
    >
        <template v-slot:error>加载失败</template>
    </van-image>
    <p class="item-tit item-con">{{title}}</p>
    <p class="item-price item-con">{{`${price}¥`}}</p>
  </div>
</template>

<script>
export default {
    props:['img','title','price']
}
</script>

<style lang="scss" scoped>
.item-con{
    text-align: center;
}
.item-tit{
    color: #ccc;
}
.item-price{
    color: red;
}
</style>