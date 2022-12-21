<template>
  <div class="home">
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
          <van-grid-item v-for="item in list" :key="item.id">
            <van-image :src="item.img" lazy-load round>
              <template v-slot:error>加载失败</template>
            </van-image>
            <p class="name">{{ item.name }}</p>
            <p>{{ item.price }}</p>
          </van-grid-item>
        </van-grid>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default{
  data(){
    return{
      pageInfo:{
        // 默认为第一页
        page:1,
        // 默认显示二十条数据
        pageSize:20,
      },
      // 总数据条数
      total:0,
      // 渲染列表的数据
      list:[],
      // 加载状态
      loading: false,
      // 加载完成状态 如果为true 就是加载全部数据完毕
      // finished: false,
      // 下拉状态 下拉松手后这个状态会变成true
      refreshing: false,
    }
  },
  created(){
    this.getList()
  },
  computed:{
    finished(){
      return this.list.length >= this.total
    }
  },
  methods:{
    getList(){
      this.$http.get('/api/list',{params:{...this.pageInfo}}).then(res=>{
        this.list = res.list
        this.total = res.total
      })
    },
    onLoad() {
      setTimeout(() => {
        // 通过 refreshing 状态判断是不是下拉刷新
        if (this.refreshing) {
          // 初始化数据
          // this.list = [];
          this.pageInfo.page = 0
          this.refreshing = false;
        }
        // 这里 vant 举例 通过for循环 将数据条数++
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // 页码++
        this.pageInfo.page++
        // 重新获取数据
        this.getList()
        this.loading = false;

        // vant 举的例子 他这里判断了列表长度如果大于40 就不加载更多
        // 真实场景中 列表的length应该大于总数据条数 total 就不加载更多了
        // if (this.list.length >= this.total) {
        //   this.finished = true;
        // }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      // this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
}
</script>
<style lang="scss">
.name{
  // 文本强制不换行
  white-space: nowrap;
  // 溢出隐藏
  overflow: hidden;
  // 文本溢出显示...
  text-overflow: ellipsis;
  width: 150px; 
  text-align: center;
}

</style>