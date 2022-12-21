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
            <!-- grid 宫格布局 -->
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="item in GoodList" :key="item.id">
                    <!-- 图片懒加载 -->
                    <van-image :src="item.img" lazy-load >
                        <template v-slot:error>加载失败</template>
                    </van-image>
                    <p> {{item.name}} </p>
                    <p> {{item.price}} </p>
                </van-grid-item>
            </van-grid>

        </van-list>
        </van-pull-refresh>

    

  </div>
</template>

<script>
export default {
    //  接受传递过来的 good-list
    props:{
        GoodList:{
            type: Array,
        },
        GoodTotal:{
            type: Number,
        },
    },
    data() {
    return {
      list: [],
      loading: false,
      refreshing: false,
    };
  },
  computed:{
    // 所有数据加载完毕
    finished(){
        return this.GoodList.length >= this.GoodTotal
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
         // 刷新时 页码数归零
          this.$emit('pageClear')
          this.refreshing = false;
        }
        // 通知父组件 让页码数+1
        this.$emit('pageAdd')

        this.loading = false;

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