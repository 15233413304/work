<template>
  <div>
    <!-- 下拉刷新 -->
    <pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 上拉加载 -->
      <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 渲染的列表 -->
        <grid :border="false" :column-num="2">
          <!-- 通过v-for循环 渲染列表 key 是一个标识符 可以提高循环效率 能保证每一项都是独一无二 -->
          <grid-item v-for="item in list" :key="item.id" @click="handleItem(item.id)">
            <van-image :src="item.img" lazy-load/>
            <p class="name">{{ item.name }}</p>
            <p>{{ item.price }}</p>
          </grid-item>
        </grid>

      </list>
    </pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List, Grid,GridItem, Image} from 'vant'
export default {
  components:{
    PullRefresh,
    List,
    Grid,
    GridItem,
    'van-image':Image,
  },
  data(){
    return{
      pageInfo:{
        // 默认为第一页
        page:1,
        // 默认每页展示二十条数据
        pageSize:20,
      },
      // 渲染列表的数据
      list:[],
      // 总数据条数
      total:0,
      // 加载效果开关
      loading: false,
      // 加载完成 所有数据已加载
      // finished: false,
      // 下拉刷新的开关
      refreshing: false,
    }
  },
  created(){
    this.getList()
  },
  computed:{
    // 加载完成 所有数据已加载
    finished(){
      return this.list.length >= this.total
    }
  },
  methods:{
    handleItem(id){
      // 前段路由传参 有两种 query  params
      // query传参 query传参不需要对路由进行修改
      // this.$router.push(`/detail?id=${id}`)

      // this.$router.push({
      //   path:"/detail",
      //   query:{id}
      // })

      // params传参 
      // this.$router.push(`/detail/${id}`)

      this.$router.push({
          name: 'detail',
          params:{id}
      })

    },
    getList(){
      this.$http.get('/api/list',{params:{...this.pageInfo}}).then(res=>{
        this.list = res.list
        this.total = res.total
      })
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
        this.pageInfo.page++
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
  },
}
</script>

<style>
.name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
    text-align: center;
  }
</style>