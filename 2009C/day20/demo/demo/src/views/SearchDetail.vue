<template>
  <div>
    <van-nav-bar 
        :title="$route.meta.title"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
    <!-- {{ list }} -->
    <van-grid :border="false" :column-num="2">
        <van-grid-item 
        v-for="item in list" :key="item.id" 
        @click="$router.push(`/detail/${item.id}`)">
        <!-- 图片懒加载 -->
        <van-image :src="item.img" lazy-load>
            <!-- 裂图处理 -->
            <template #error>
            加载失败
            </template>
        </van-image>
        <h3>{{ item.name }}</h3>
        <p>{{ item.desc }}</p>
        <p class="price">{{ item.price }}¥</p>
        </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
    computed:{
        list(){
            let { homeList } = this.$store.state
            let { value } = this.$route.query
            console.log(this.$store.state.homeList)

            return homeList.filter(item=> item.name.includes(value))
        }
    }
}
</script>

<style lang="stylus">
p,h3
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    max-width 150px
  .price
    color red 
</style>