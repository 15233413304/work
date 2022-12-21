<template>
  <div>
    <!-- {{GoodList}} -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- 上拉加载 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <!-- 列表内容 使用宫格 grid 布局  :column-num 每列显示几条数据-->
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="item in GoodList" :key="item.id">
                    <!-- 使用图片懒加载 LazyLoad  -->
                    <van-image :src="item.img" lazy-load>
                        <!-- 裂图处理 -->
                        <template v-slot:error>加载失败</template>
                    </van-image>
                    <p>{{item.name}}</p>
                    <p>{{item.price}}</p>
                </van-grid-item>
            </van-grid>
        </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
export default {
    // 使用props 接受父组件传过来的数据
    props:{
        GoodList:{
            type:Array,
        },
        GoodTotal: {
            type: Number,
        }
    },
    data() {
    return {
    //   list: [],
      loading: false,
    //   finished: false,
      refreshing: false,
    };
  },
  computed:{
    finished(){
        return this.GoodList.length >= this.GoodTotal
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        // 下拉的时候 this.refreshing 会变成true
        if (this.refreshing) {
          // 初始化数据
        //   this.list = [];
        this.$emit('clearpage')
         //   this.refreshing 会变成flse
          this.refreshing = false;
        }
        // 上拉的时候让数据条数增加
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // 通知父组件 让页码数++
        this.$emit('addpage')
        // 转圈的状态
        this.loading = false;
        // 没有更多数据了 已全部加载完毕
      }, 1000);
    },
    onRefresh() {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
}
</script>

<style>

</style>