<template>
  <van-grid-item>
    <van-image round width="5rem" height="5rem" :src="imgUrl" />
    <p>{{ itemData.goods }}</p>
    <p>{{ itemData.price }}</p>
  </van-grid-item>
</template>

<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
    itemData:{
        type:Object
    }
})
const imgUrl = ref("https://img01.yzcdn.cn/vant/cat.jpeg")
setTimeout(() => {
    imgUrl.value = props.itemData.url;
}, 1000);

</script>

<style>
</style>