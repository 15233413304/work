<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 上拉加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- 列表 -->
        <van-grid :column-num="3">
            <van-grid-item v-for="value in list" 
              :key="value.name" icon="photo-o" :text="value.name">
              <van-image
                width="100"
                height="100"
                lazy-load
                :src="value.url"
              >
                <!-- 裂图处理 提示加载失败 -->
                <template #error>加载失败</template>
              </van-image>
            </van-grid-item>
          </van-grid>
      </van-list>

    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  computed:{
    list(){
      // 返回 vuex home模块下的homeList
      return this.$store.state.home.homeData.homeList
    },
    // 一共有多少条数据
    total(){
      return this.$store.state.home.homeData.total
    }
  },
  created(){
    // 调用vuex home模块下的actions里的 getList函数
    this.$store.dispatch("home/getList",this.pages)
    console.log(this.$store.getters['home/list'])
  },
  data() {
    return {
      pages:{
        // 初始页码
        page:1,
        // 初始每页显示几条数据
        pageSize:30,
      },
      // 是否加载了所有数据
      finished:false,
      // loading 转圈效果
      loading: false,
      // 下拉刷新时 vant会默认设置 refreshing 为true
      refreshing: false,
    };
  },
  methods: {
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        // 下拉刷新
        if (this.refreshing) {
          // 当前页码变为0
          this.pages.page = 0
          // 刷新变为false
          this.refreshing = false;
        }
        // 页码+1
        this.pages.page++
        // 通过vuex重新获取接口数据
        this.$store.dispatch("home/getList",this.pages)
        // 加载状态变为false
        this.loading = false;
        // 当页面渲染的列表长度和 后端数据总数一致时 加载完毕
        if (this.list.length >= this.total) {
          // 加载完毕的状态设置为true
          this.finished = true;
        }
      }, 1000);
    },
    // 下拉刷新
    onRefresh() {
      // 重置页码 finished也初始化
      this.finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
}
</script>

<style>

</style>