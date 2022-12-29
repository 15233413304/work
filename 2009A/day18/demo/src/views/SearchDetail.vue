<template>
  <div>
    <van-nav-bar 
     :title="$route.meta.title" 
     left-arrow 
     left-text="返回"
     @click-left="$router.back()"/>
    <van-empty description="暂无符合条件的商品" v-if="!searchList.length"/>
    <div v-else>
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="item in searchList" :key="item.id" @click="$router.push(`/detail/${item.id}`)">
            <!-- 图片懒加载 -->
            <van-image :src="item.img" lazy-load round>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState('home',['homeList']),
        searchList(){
           return this.homeList.filter(item=> item.name.includes(this.$route.query.shop))
        }
    }
}
</script>

<style>

</style>