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
        <!-- 模糊搜索 -->
        <div class="search">
            <input type="text" v-model="searchValue" @input="inputSearch"/>
            <van-button round size="small" type="primary" @click="handleSearch">搜索</van-button>
            <!-- <van-popover v-model="showPopover" :actions="searchActions"></van-popover> -->
            <search-module class="search-box" v-if="showPopover" :actions="searchActions" @clickItem="clickTitle"/>
        </div>
        
        <!-- 列表渲染 -->
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="item in list" :key="item.id" @click="toDetail(item.id)">
            <van-image
                lazy-load
                round
                width="100"
                height="100"
                :src="item.img"
              >
              <template v-slot:error>加载失败</template>
            </van-image>
              <h4>{{item.title}} <span class="price">¥{{item.price}}</span></h4>
              <p class="con">{{item.content}}</p>
          </van-grid-item>
        </van-grid>
        <!-- 模糊搜索列表 -->
        <!-- <van-grid :border="false" :column-num="2" v-if="isSearch">
          <van-grid-item v-for="item in searchList" :key="item.id" @click="toDetail(item.id)">
            <van-image
                lazy-load
                round
                width="100"
                height="100"
                :src="item.img"
              >
              <template v-slot:error>加载失败</template>
            </van-image>
              <h4>{{item.title}} <span class="price">¥{{item.price}}</span></h4>
              <p class="con">{{item.content}}</p>
          </van-grid-item>
        </van-grid> -->

      </van-list>
    </van-pull-refresh>


   
  </div>
</template>

<script>
import SearchModule from '@/components/SearchModule.vue'
export default {
  components:{
    SearchModule
  },
  data(){
    return{
      // 上拉加载页码数 默认是1 每次上拉页码数+1
      page: 1,
      // loading加载状态
      loading: false,
      // 是否加载完成全部数据 没有更多了
      // finished: false,
      // 下拉刷新的开关变量 如果下拉 这个变量会变成true
      refreshing: false,
      // 搜索框输入的内容
      searchValue:'',
      // 是否展示模糊搜索的列表
      isSearch: false,
      // 是否显示提示弹窗
      showPopover: false
    }
  },
  computed:{
    // 从vuex里拿到商品列表
    list(){
      if(this.isSearch){
        // 如果点击了搜索 那就筛选出 包含输入框内容的商品项
        return this.$store.state.list.filter(item=> item.content.includes(this.searchValue) || item.title.includes(this.searchValue))
      }
      return this.$store.state.list
    },
    // 是否加载完成全部数据 没有更多了
    finished(){
      return this.list.length >= 60 || this.page >= 6
    },
    searchActions(){
      return this.$store.state.list.filter(item=> item.title.includes(this.searchValue))
    }
    // searchList(){
    //   return this.list.filter(item=> item.content.includes(this.searchValue) || item.title.includes(this.searchValue))
    // }
  },
  created(){
    this.fetchList()
  },
  methods:{
    // 请求数据的函数
    fetchList(){
      this.$store.dispatch('getList',this.page)
    },
    // 上拉加载触发的函数
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          // this.list = [];
          // 将页码初始化为第一页
          this.page = 1
          // 重新发起请求
          this.fetchList()
          // 将下拉刷新开关变量关掉
          this.refreshing = false;
          this.loading = false;
          return
        }
        // 上拉加载
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // 上拉加载时 页码数++
        this.page ++ 
        // 重新请求数据
        this.fetchList()
        this.loading = false;

        // if (this.list.length >= 60) {
        //   this.finished = true;
        // }
      }, 1000);
    },
    // 下拉刷新触发的事件
    onRefresh() {
      // 清空列表数据
      // this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 跳详情
    toDetail(id){
      this.$router.push({
        name:"Detail",
        params:{
          id
        }
      })
    },
    // 模糊搜索
    handleSearch(){
      if(this.searchValue == ''){
        return this.isSearch = false
      }
      this.isSearch = true
      this.showPopover = false
      this.$store.commit('setHistory',this.searchValue)
    },
    // 当模糊搜索输入框输入的时候触发
    inputSearch(){
      this.isSearch = false
      this.showPopover = true
    },
    // 点击提示框的文字
    clickTitle(title){
      this.searchValue = title
      this.showPopover = false
    }
  }
}
</script>

<style lang="scss" scoped>
.price{
  color: red;
}
.con{
  color: #ccc;
  font-size: 12px;
}
.van-grid{
  padding-top: 50px;
}
.search{
  position: fixed;
  top: 50px;
  z-index: 999;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-evenly;
  &-box{
    position: absolute;
    top: 32px;
    left: 50px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
  }
  input{
    border: 1px solid #ccc;
    border-radius: 50px;
    text-indent: 10px
  }
}
</style>