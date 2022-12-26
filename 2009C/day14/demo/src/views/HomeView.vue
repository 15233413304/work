<template>
  <div>
    <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="item in list" :key="item.id" @click="handleToDetail(item.id)">
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
    },
    methods:{
        // 跳转详情页
        handleToDetail(id){
            // 通过params传参方式 跳转详情页
            this.$router.push(`/detail/${id}`)
        }
    }
}
</script>

<style>

</style>