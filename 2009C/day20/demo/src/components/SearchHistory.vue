<template>
  <div class="history" v-if="historyList.length">
    <p> 历史记录：</p>
    <hr>
    <van-tag 
        v-for="(item,index) in historyList" :key="index"
        closeable size="large" type="primary" 
        @close="delHistory(index)"
        @click="handleHistory(item)">
        {{item}}
    </van-tag>
  </div>
  <van-empty class="history" v-else image="search" description="暂无历史记录" />
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState(['historyList']),
        // historyList(){
        //     return this.$store.state.historyList
        // }
    },
    methods:{
        // 删除历史记录
        delHistory(index){
            this.$store.commit('delHistory',index)
        },
        // 点击标签时 通知父组件改变输入框内容
        handleHistory(value){
            this.$emit('change',value)
        }
    }
}
</script>

<style lang="stylus" scoped>
.history
  width 300px
  min-height 200px
  box-sizing border-box
  padding 10px
  border-radius 10px
  background #f5f5f5
  margin auto
  position absolute
  top 50px
  left 15px
  z-index 999
  .van-tag
    margin 10px
.custom-image
:deep(.van-empty__image) 
    width: 80px;
    height: 80px;

</style>