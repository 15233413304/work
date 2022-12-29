<template>
  <div>
    <!-- {{ list }} -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- 上拉加载 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <!-- 列表内容 -->
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="item in list" :key="item.id" @click="$router.push(`/detail/${item.id}`)">
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
        </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
export default {
  computed: {
    //分模块后 获取state里的数据 需要对应上模块名  this.$strore.state.模块名.模块下的数据
    list() {
    //   console.log(this.$store.state);
      return this.$store.state.home.homeList;
    },
    finished(){
      // 根据当前数据条数 和总数据条数对比 如果 >= 完成加载 不能在加载了
      return this.list.length >= this.$store.state.home.total
    }
  },
  data() {
    return {
      pageInfo: {
        //当前页数
        page: 1,
        // 每页显示的数据条数
        pageSize: 20,
      },
      loading: false,
      refreshing: false,
    };
  },
  methods: {
    getList() {
      // 分模块后 写法有所不同 异步方法 dispatch('模块名/模块下的函数名',参数)
      this.$store.dispatch("home/getHomeList", { ...this.pageInfo });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          // 初始化列表
          // this.list = [];
          this.pageInfo.page = 0
          this.refreshing = false;
        }
        // 上拉加载
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        this.pageInfo.page ++
        // 因为页码变更了 需要重新请求返回最新的数据条数
        this.getList()
        this.loading = false;

        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },
    onRefresh() {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="stylus">
.van-grid-item
  p,h3
    // 文本强制不换行
    white-space nowrap
    // 溢出隐藏
    overflow hidden
    // 文本溢出显示...
    text-overflow ellipsis
    max-width 150px
  .price
    color red
</style>