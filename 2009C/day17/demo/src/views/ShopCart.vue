<template>
  <div class="shop" v-if="list.length">
    <van-checkbox-group v-model="checked" ref="checkboxGroup">
      <div v-for="item in list" :key="item.id" class="item-card">
          <!-- 单选 -->
         <van-checkbox :name="item"/>
          <!-- 滑动单元格 -->
          <van-swipe-cell>
              <van-card
                :price="`${item.price}.00`"
                :desc="item.desc"
                :title="item.name"
                class="goods-card"
                :thumb="item.img"
              >
                <template #num>
                  <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
                </template>
              </van-card>
              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" 
                @click="delShop(item.id)"/>
              </template>
          </van-swipe-cell>
      </div>
    </van-checkbox-group>

    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
      <van-button type="primary" @click="checkAll" size="mini">全选</van-button>
      <van-button type="info" @click="toggleAll" size="mini">反选</van-button>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>

  </div>
  <van-empty
    v-else
    class="custom-image"
    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
    description="暂无商品"
  />
</template>

<script>
export default {
  computed:{
    list(){
      return this.$store.state.shop.shopList
    },
    allPrice(){
      return this.checked.reduce((prev,next)=>{
        return prev + next.count * next.price
      },0) * 100
    }
  },
  data(){
    return{
      checked:[]
    }
  },
  methods:{
    // 全选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    // 反选
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    // 提交订单
    onSubmit(){

    },
    //修改地址
    onClickEditAddress(){

    },
    // 删除商品
    delShop(id){
      this.$store.commit('shop/delShop',id)
      let index = this.checked.findIndex(item=> item.id == id)
      this.checked.splice(index,1)
    }
  }
};
</script>

<style lang="stylus">
.shop
  height 100%
  background #f5f5f5
  .van-submit-bar
    bottom 50px
    &__tip
      span
        color blue
  .item-card
    display flex
    justify-content space-between
    padding 10px
    background #fff
    margin 0 auto 10px
    width 90%
    border-radius 10px
    .van-checkbox
      min-width 20px
      margin 5px
    .goods-card
      margin 0
      background-color white
    .delete-button
      height 100%

</style>