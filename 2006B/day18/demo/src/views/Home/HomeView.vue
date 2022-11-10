<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoading"
        >
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return{
            page: 1,
            // 上拉加载loading状态
            loading: false,
            // 完成全部数据加载
            finished: false,
            // 下拉刷新loading状态
            refreshing: false,
        }
    },
    computed:{
        // list(){
        //     return this.$store.state.home.list
        // }

        ...mapState('home',['list','total'])
    },
    methods:{
        // this.getList 就是src/store/module/home模块下的actions的getList函数
        ...mapActions('home',['getList']),
        onLoading(){
            setTimeout(() => {
                if (this.refreshing) {
                    // 初始化页数
                    this.page = 0
                    this.refreshing = false;
                }
                // 当下拉时候 当前页码数+1 于是呢 返回的数值就会多10条
                this.page++
                 // 把最新的页码数传过去 返回一个新的列表
                this.getList(this.page)
                this.loading = false;
                if (this.list.length >= this.total) {
                  this.finished = true;
                }
            }, 2000);      
        },
        // 下拉的时候触发的函数
        onRefresh(){
              // 清空列表数据
              this.finished = false;

              // 重新加载数据
              // 将 loading 设置为 true，表示处于加载状态
              this.loading = true;
              this.onLoading();
        }
    },
    mounted(){
        // this.$store.dispatch('home/getList',this.page)

        this.getList(this.page)
    }
}
</script>

<style lang="scss" scoped>

</style>