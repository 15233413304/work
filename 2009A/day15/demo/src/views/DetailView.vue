<template>
  <div>
    <!-- {{ detailData }} -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in detailData.detailData?.banner" :key="index">
        <van-image :src="item" />
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active">
        <van-tab title="商品信息">
            <van-card
                :price="`${detailData.price}.00`"
                desc="描述信息"
                :title="detailData.name"
                :thumb="detailData.img"
            />
        </van-tab>
        <van-tab title="商品评论">
            <div class="talk">
                <p v-if="!talkList"> 暂无评论 </p>
                <p v-for="(item,index) in talkList" :key="index">{{ item }}</p>
            </div>
            <div class="talk-ipt">
                <input type="text" v-model="talkIpt"> <van-button type="default" size="mini" @click="handleTalk">评论</van-button>
            </div>
        </van-tab>
    </van-tabs>
   
  </div>
</template>

<script>
export default {
  data(){
    return {
        talkIpt:'',
        active:0,
    }
  },
  computed: {
    detailData() {
      return this.$store.state.detailData;
    },
    talkList(){
      return this.$store.state.detailData.talk
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let { tab, id } = this.$route.params;
      // console.log(tab,id)
      this.$store.dispatch("getDetail", { tab, id });
    },
    handleTalk(){
        if(this.talkIpt.length){
            this.$store.commit('setTalk',this.talkIpt)
        }
    }
  },
};
</script>

<style lang="stylus">
.van-swipe
  text-align center
  background #f5f5f5
.talk
  margin 20px
  padding 10px
  text-align center
.talk-ipt
  margin auto
  text-align center
</style>