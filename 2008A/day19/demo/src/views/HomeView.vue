<template>
  <div>
    <van-tabs v-model="tabIndex" sticky @change="changeTab">
    <van-popover v-model="showPopover">
      <div class="pop-over">
        <div v-if="searchHistory.length">
           <p>历史记录：</p> <p class="clear" @click="handleClear">清空历史记录</p>
           <van-tag
            v-for="item in searchHistory"
            size="large"
            :key="item"
            color="#ffe1e1" 
            text-color="#ad0000"
            closeable 
            @close="closeTag(item)"
            @click="handleSearch(item)">
            {{item}}
           </van-tag>
        </div>
       <div v-else class="no-history">
          ———— 暂无历史记录 ————
       </div>
        
      </div>
      <template #reference>
        <!-- <van-button type="primary">自定义内容</van-button> -->
        <van-search
          v-model="searchValue"
          shape="round"
          background="#FFFFFF"
          placeholder="请输入搜索关键词"
          @change="()=>handleSearch()"
          @input="handleInput"
          @focus="(showPopover = true)"
        />
      </template>
    </van-popover>

    
    <van-tab v-for="item in tabList" :title="item" :key="item">

      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- 上拉加载 -->
        <van-list
          v-model="loading"
          :finished="isAll"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 列表内容 -->
             <!-- 宫格布局 -->
              <van-grid :column-num="2">
                <van-grid-item 
                  v-for="i in homeList.list" 
                  :key="i.id"
                  @click="handleToDetail(i.id)">
                  <!-- 图片 懒加载 lazy-load 圆形 round-->
                  <van-image lazy-load round :src="i.img">
                      <!-- 裂图处理 -->
                      <template v-slot:error>加载失败</template>
                  </van-image>
                  <p>{{i.title}}</p>
                  <p class="i-content">{{i.contnet}}</p>
                  <p class="i-price">{{i.price}}¥</p>
                </van-grid-item>
              </van-grid>

        </van-list>
      </van-pull-refresh>
        
    </van-tab>
  </van-tabs>
  </div>
</template>

<script>

// import { mapActions,mapState } from 'vuex';
export default {
  data(){
    return{
      tabList:['每日','每周','每月','每年'],
      // 当前tab切换的下标
      tabIndex: 0,
      // 当前第几页
      page:1,
      // 每页显示多少条数据
      pageSize:20,
      // 加载状态
      loading: false,
      // 是否已加载全部数据
      finished: false,
      // 是否是 下拉刷新
      refreshing: false,
      // 搜索框输入的内容
      searchValue:'',
      // 搜索历史记录弹窗显示
      showPopover: false
    }
  },
  computed:{
    // 映射一个 homeList  来自于vuex中的 state
    // ...mapState(['homeList'])
    homeList(){
      return this.$store.state.homeList
    },
    // 是否已加载全部数据
    isAll(){
      return this.homeList.list?.length >= this.homeList.total
    },
    // 历史记录列表
    searchHistory(){
      return this.$store.state.searchHistory
    }
  },
  methods:{
    // 映射出一个 getList函数 用来获取数据
    // ...mapActions(['getList']),
    getList(){
      let { tabIndex, page, pageSize } = this  
      this.$store.dispatch('getList',{ tabIndex, page, pageSize })
    },
    changeTab(){
      // let { tabIndex, page, pageSize } = this  
      // this.getList({ tabIndex, page, pageSize })
      // tab切换时 列表变为第一页
      this.page = 1
      this.getList()
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        // 如果是下拉刷新 会走到这个条件里
        if (this.refreshing) {
          // 列表初始化
          // this.homeList.list = [];
          this.page = 0
          // 将刷新状态变为false
          this.refreshing = false;
        }
        // 页码数+1
        this.page ++ 
        // 页码变化后，重新发起请求
        this.getList()
        this.loading = false;

      }, 1000);
    },
    // 下拉刷新
    onRefresh() {
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 点击商品 跳转到详情页
    handleToDetail(id){
      // this.$router.push(`/detail/${this.tabIndex}/${id}`)
      this.$router.push({
        name:'Detail',
        params:{
          tab:this.tabIndex,
          id,
        }
      })
    },
    // 搜索框内容改变 触发的函数
    handleSearch(value){
      if(value){
        this.searchValue = value
      }
      // this.$router.push(`/search?tab=${this.tabIndex}&value=${this.searchValue}`)
      this.$router.push({
        path:'/search',
        query:{
          tab: this.tabIndex,
          value: this.searchValue
        }
      })
    },
    handleInput(){
      // 当输入框没有内容时显示历史记录弹窗 以供选择
      if(this.searchValue.length){
        return this.showPopover = false
      }
      // 输入框没内容时隐藏历史记录弹窗
      this.showPopover = true
    },
    closeTag(name){
      // 点击标签上的x时 删掉历史记录
      this.$store.commit('delHistory',name)
    },
    handleClear(){
      //清空历史记录
      this.$store.commit('clearHistory')
    }
  },
  created(){
    // let { tabIndex, page, pageSize } = this  
    // this.getList({ tabIndex, page, pageSize })
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.i-content{
  max-width: 100px;
  // 溢出隐藏
  overflow: hidden;
  // 强制不换行
  white-space: nowrap;
  // 文字溢出显示...
  text-overflow: ellipsis;
}
.i-price{
  color: red;
}

.van-popover__wrapper{
  width: 100%;
}
.pop-over{
  width: 90vw;
  min-height: 100px;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  .clear{
    float: right;
    margin-right: 10px;
    margin-top: -30px;
    color: #ccc;
    font-size: 12px;
  }
  span{
    margin: 10px;
  }
  .no-history{
    text-align: center;
    color: #ccc;
  }
}
</style>