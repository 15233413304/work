<template>
  <div>
    <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="item in list" :key="item.id">
            <van-image :src="item.img" />
            <p>{{ item.name }}</p>
            <p>{{ item.price }}</p>
        </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
    computed:{
        list(){
            return this.$store.state.homeList
        }
    },
    created(){
        this.$store.dispatch('getList')
    }
}
</script>

<style>

</style>