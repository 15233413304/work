<template>
  <div>
    <nav-bar :navName="'主页'" :hasBack="true" @back="$router.go(-1)"/>
    <van-search v-model="value" placeholder="请输入搜索关键词"/>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoading"
        >
        
        <van-row type="flex" justify="space-around" align="center">
            <van-col span="12" v-for="(item,index) in searchList" :key="index" @click="handleItem(item)">
                <!-- <van-image
                    lazy-load
                    width="100"
                    height="100"
                    :src="item.img"
                >
                 <template v-slot:error>加载失败</template>
                </van-image>
                <p class="item-tit item-con">{{item.title}}</p>
                <p class="item-price item-con">{{`${item.price}¥`}}</p> -->
                <item-card :img="item.img" :title="item.title" :price="item.price"/>
            </van-col>
        </van-row>
            
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NavBar from '@/components/NavBar.vue'
import ItemCard from '@/components/ItemCard.vue'

export default {
    components:{
        NavBar,
        ItemCard,
    },
    data(){
        return{
            page: 1,
            // 上拉加载loading状态
            loading: false,
            // 完成全部数据加载
            finished: false,
            // 下拉刷新loading状态
            refreshing: false,
            // 搜索内容
            value:'',
        }
    },
    computed:{
        // list(){
        //     return this.$store.state.home.list
        // }
        searchList(){
            if(this.value){
              return this.list.filter(item=> item.title.includes(this.value))
            }
            return this.list
        },
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
        },
        handleItem(item){
            // 跳转详情
            this.$store.commit('home/setDetail',item),
            this.$router.push('/detail')
        },
        // handleInput:throttling(function(val){ 
        //     this.searchList = this.list.filter(item=> item.title.includes(val))
        // })
    },
    mounted(){
        // this.$store.dispatch('home/getList',this.page)
        this.getList(this.page)
    },
}
</script>

<style lang="scss" scoped>
.van-col{
    padding: 0 20px;
    text-align: center;
}
</style>