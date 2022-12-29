<template>
  <div class="history">
    <div v-if="historyList.length">
        历史记录
        <hr>
        <van-tag 
            size="large"
            closeable
            plain
            type="primary"
            v-for="(item,index) in historyList"
            :key="index"
            @click="handleToSearch(item)"
            @close="handleClose(index)">
            {{ item }}
        </van-tag>
    </div>
    <van-empty v-else description="暂无记录" />
    

  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
    computed:{
        ...mapState('home',['historyList']),
        // 等价于
        // historyList(){
        //     return this.$store.state.home.historyList
        // }
    },
    methods:{
        ...mapMutations('home',['delHistory']),
        handleClose(index){
            // this.$store.commit('home/delHistory',index)
            this.delHistory(index)
        },
        handleToSearch(item){
            this.$emit('search',item)
        }
    }
}
</script>

<style lang="stylus" scoped>
.history
  position absolute
  top 45px
  left 3%
  background #f5f5f5
  z-index 999
  width 80%
  min-height 100px
  border-radius 10px
  box-sizing border-box
  padding 20px
//   >>>.van-empty__image
//     width 50px
//     height 50px
  :deep(.van-empty__image)
    width 50px
    height 50px
  :deep(.van-tag)
    margin 10px 5px
</style>