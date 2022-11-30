<template>
  <div>
    <van-checkbox-group v-model="checked" ref="checkboxGroup">
      <div class="item-shop" 
        v-for="item in shopList" 
        :key="item.id">
        <van-checkbox :name="item"/>
        <van-swipe-cell>
          <van-card
            :price="`${item.price}.00`"
            :desc="item.contnet"
            :title="item.title"
            class="goods-card"
            :thumb="item.img"
          >
            <template #footer>
              <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>
    </van-checkbox-group>
    <van-empty v-if="!shopList.length" description="暂无商品" />

    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
      <!-- <van-checkbox  :value="checked.length == shopList.length" @click="checkAll">全选</van-checkbox> -->
      <van-button type="info" size="mini" @click="checkAll">全选</van-button>

      <van-button type="info" size="mini" @click="toggleAll">反选</van-button>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
export default {
  data(){
    return{
      checked:[],
    }
  },
  computed:{
    // ...mapState(['shopList'])
    shopList(){
      return this.$store.state.shopList
    },
    allPrice(){
      // 计算总价
      return this.checked.reduce((prev,next)=>{
        return prev + next.count * next.price
      },0) * 100
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
    onClickEditAddress(){
      // onClickEditAddress
    },
    onSubmit(){

    }
  }
}
</script>

<style lang="scss" scoped>
.item-shop{
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px;
  .van-swipe-cell{
    flex: 1;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
}
.van-submit-bar{
  bottom: 50px;
  .van-submit-bar__tip span{
    color: #1989fa;
  }
}
</style>