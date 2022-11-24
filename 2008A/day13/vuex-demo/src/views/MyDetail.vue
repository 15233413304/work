<template>
  <div>
    <van-image
          fit="contain"
          width="100%"
          :src="detailData.img"
        />
      <p>{{detailData.name}}</p>
      <p>{{detailData.price}}¥</p>

      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服"/>
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
        <van-goods-action-icon icon="star" :text="starTitle" :color="starColor" @click="clickStar"/>
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
  </div>
</template>

<script>
export default {
  data(){
    return{
      detailData:{}
    }
  },
  computed:{
    // 收藏文字   已收藏  收藏
    starTitle(){
      // 看vuex中 starList 是否存在这个详情页商品的id
      let isStar = this.$store.state.starList.includes(this.detailData.id)
      // 如果存在
      if(isStar){
        return '已收藏'
      }
      // 不存在
      return '收藏'
    },
    // 收藏颜色  已收藏时红色 未收藏 不给颜色
    starColor(){
      // 看vuex中 starList 是否存在这个详情页商品的id
      let isStar = this.$store.state.starList.includes(this.detailData.id)
       // 如果存在
       if(isStar){
        return 'red'
      }
      // 不存在
      return '#ccc'
    }
  },
  created(){
    // 使用find方法查找符合条件项 并把符合条件的那一项返回
    this.detailData = this.$store.state.list.find(item => item.id == this.$route.params.id)
  },
  methods:{
    clickStar(){
      // 调用 vuex中 mutations里的 setStar函数
      this.$store.commit('setStar',this.detailData.id)
    }
  }
}
</script>

<style>

</style>