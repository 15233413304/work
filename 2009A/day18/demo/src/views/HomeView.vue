<template>
  <div class="home">
    <van-search
        v-model="shopName"
        show-action
        placeholder="请输入商品名"
        @search="onSearch"
        @input="changeValue"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <search-history v-if="showHistory" @search="handleSearch"/>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 上拉加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 渲染的列表内容 -->
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
import { mapMutations } from 'vuex'
import SearchHistory from '@/components/SearchHistory.vue'
export default {
  components:{
    SearchHistory
  },
  computed:{
    // 分模块后 需要通过 this.$store.state.模块名.属性名 来获取vuex对应模块下的数据
    list(){
      // console.log(this.$store)
      return this.$store.state.home.homeList
    },
    finished(){
      // 当目前页面数据 >= 总数据条数时 不再加载 所有数据加载完毕
      return this.list.length >= this.$store.state.home.total
    }
  },
  data(){
    return{
      pageInfo:{
        page:1,
        pageSize:20,
      },
      loading: false,
      refreshing: false,
      // 搜索的商品名称
      shopName:'',
      // 是否显示历史记录组件
      showHistory:false,
    }
  },
  methods:{
    getList(){
      // 分模块后 使用dispatch 有所不同 dispatch('模块名/模块下的actions里的函数',携带参数)
      this.$store.dispatch('home/getList',{...this.pageInfo})
    },
    onLoad() {
      setTimeout(() => {
        
        if (this.refreshing) {
          // 下拉刷新 初始化列表
          // this.list = [];
          this.pageInfo.page = 0
          this.refreshing = false;
        }
        // 每次上拉加载时 数据变多
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        this.pageInfo.page++
        //页码改变后需要重新获取数据
        this.getList()
        this.loading = false;

        // if (this.list.length >= 40) {
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
    ...mapMutations('home',['createHistory']),
    onSearch(){
      if(this.shopName.length){
        // 通过query传参 跳转到搜索页面
        // this.$store.commit('home/createHistory',this.shopName)

        this.createHistory(this.shopName)
        this.$router.push(`/search?shop=${this.shopName}`)
        this.shopName = ''
      }
    },
    handleSearch(name){
      this.createHistory(name)
      this.$router.push(`/search?shop=${name}`)
    },
    changeValue(){
      if(!this.shopName.length){
        this.showHistory = false
      }else{
        this.showHistory = true
      }
    }
  },
  created(){
    this.getList()
  },
  activated(){
    this.showHistory = false
    this.shopName = ''
  }
}
</script>

<style lang="stylus">
.home
  position relative
.van-grid-item
  h3,p
    //溢出隐藏
    overflow hidden
    //强制不换行
    white-space nowrap
    //文本溢出显示...
    text-overflow ellipsis
    max-width 150px
  .price
    color red

</style>