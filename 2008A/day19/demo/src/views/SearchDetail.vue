<template>
  <div v-if="list.length">
    搜索内容
    <!-- 宫格布局 -->
    <van-grid :column-num="2">
    <van-grid-item 
        v-for="i in list" 
        :key="i.id"
        @click="handleToDetail(i.id)">
        <!-- 图片 懒加载 lazy-load 圆形 round-->
        <van-image lazy-load round :src="i.img">
            <!-- 裂图处理 -->
            <template v-slot:error>加载失败</template>
        </van-image>
        <!-- <p>{{i.title}}</p> -->
        <!-- <p class="i-content">{{i.contnet}}</p> -->
        
        <pre v-html="preFn(i.title)"></pre>
        <pre class="i-content" v-html="preFn(i.contnet)"></pre>   
        <p class="i-price">{{i.price}}¥</p>
    </van-grid-item>
    </van-grid>
  </div>
  <van-empty v-else image="search" description="暂无搜索内容" />
</template>

<script>
// import { mapActions, mapState } from 'vuex'
export default {
    computed:{
        // ...mapState('searchList'),
        list(){
            return this.$store.state.searchList
        },
    },
    created(){
        this.getList()
    },
    methods:{
        // ...mapActions('getSearchList'),
        getList(){
            let tabIndex = this.$route.query.tab
            let { value } = this.$route.query
            this.$store.dispatch('getSearchList',{ tabIndex, value })
        },
        preFn(str){
            let { value } = this.$route.query
            return str.split(value).join(`<b>${value}</b>`)
        },
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
// 深度样式渲染 :deep()
pre:deep(b){
    color: rgb(197, 5, 255);
}
.i-price{
  color: red;
}
</style>