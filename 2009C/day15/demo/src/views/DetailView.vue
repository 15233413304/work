<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in detailData.banner" :key="index">
        <van-image :src="item"/>
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active">
      <van-tab title="商品详情">
        <van-card
          tag="标签"
          :price="`${detailData.price}.00`"
          desc="描述信息"
          :title="detailData.name"
          :thumb="detailData.img"
          :origin-price="`${detailData.price * 10}.00`"
        />
      </van-tab>
      <van-tab title="商品评论">
        <div class="talk">
          <p v-if="!detailData.talkList"> -- 暂无评论 -- </p>
          <p v-for="(item,index) in detailData.talkList" :key="index">
            {{ item }}
          </p>
        </div>
        <div class="my-talk">
          <input type="text" v-model="talkInput" @keydown.enter="handleTalk">
          <van-button type="default" size="mini" @click="handleTalk">评论</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active:0,
      // 评论内容
      talkInput:''
    }
  },
  computed:{
    detailData(){
      return this.$store.state.detailData
    }
  },
  created(){
    this.getDetail()
  },
  methods:{
    getDetail(){
      let { id, tab } = this.$route.params
      this.$store.dispatch('getDetail', { id, tab })
    },
    handleTalk(){
      if(this.talkInput.length){
        // 调vuex 同步方法 setTalk 添加评论
        this.$store.commit('setTalk',this.talkInput)
        this.talkInput = ''
      }
    }
  }
}
</script>

<style lang="scss">
.talk{
  margin: 20px auto;
  text-align: center;
}
.my-talk{
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>