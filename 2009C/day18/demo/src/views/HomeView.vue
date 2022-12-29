<template>
  <div>
    <!-- {{ list }} -->
    <!-- {{ homeList }} -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 上拉加载 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <!-- 渲染列表 -->
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="item in homeList" :key="item.id">
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
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data(){
    return{
      pageInfo:{
        page:1,
        pageSize: 20,
      },
      loading: false,
      // finished: false,
      refreshing: false,
    }
  },
  computed:{
    ...mapState(['homeList','total']),
    // list(){
    //   return this.$store.state.homeList
    // },
    // total(){
    //   return this.$store.state.total
    // },
    finished(){
      return this.homeList.length >= this.total
    }
  },
  methods:{
    ...mapActions(['getHomeList']),
    getList(){
      //使用辅助函数映射的函数
      this.getHomeList({...this.pageInfo})
      //调用vuex 来获取数据
      // this.$store.dispatch('getHomeList',{...this.pageInfo})
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          //下拉刷新 初始化列表
          // this.list = [];
          this.pageInfo.page = 0
          this.refreshing = false;
        }

        // 上拉加载增加数据条数
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        this.pageInfo.page++
        this.getList()
        this.loading = false;

        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      // this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="stylus">
.van-grid-item
  p,h3
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    max-width 150px
  .price
    color red 
</style>