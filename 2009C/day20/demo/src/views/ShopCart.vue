<template>
  <div>
    <!-- {{ cartList }} -->
    <!-- {{ list }} -->
    <van-checkbox-group v-model="result" ref="checkboxGroup" v-if="list.length">
      <div v-for="item in list" :key="item.id" class="item-shop">
         <van-checkbox :name="item"/>
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
            <van-button 
            square 
            text="删除"
            type="danger" 
            class="delete-button"
            @click="delShop(item.id)" />
          </template>
        </van-swipe-cell>
      </div>
    </van-checkbox-group>
    <van-empty
      v-else
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品"
    />

    <van-submit-bar :price="shopPrice" button-text="提交订单" @submit="onSubmit">
      <van-button type="primary" @click="checkAll">全选</van-button>
      <van-button type="info" @click="toggleAll">反选</van-button>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  computed:{
    // ...mapState(['cartList']),
    list(){
      return this.$store.state.cartList
    },
    shopPrice(){
      return this.result.reduce((prev,next)=>{
        return prev + next.count * next.price
      },0) * 100
    }
  },
  data(){
    return {
      // 处于选中状态的复选框 （当前场景为：选中的商品）
      result:[],
    }
  },
  methods:{
    //全选
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    //反选
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    // 修改默认地址
    onClickEditAddress(){

    },
    // 提交订单
    onSubmit(){

    },
    //删除商品
    delShop(id){
      this.$store.commit('delShop',id)
      let index = this.result.findIndex(item=> item.id == id)
      if(index> -1){
        this.result.splice(index,1)
      }
    }
  }
}
</script>

<style lang="stylus">
  .item-shop
    display flex
    width 90%
    margin auto
    box-sizing border-box
    padding 15px
    background #fafafa
    .van-checkbox
      min-width 30px
      margin auto
  .goods-card
    margin 0
    background-color @white
  .delete-button
    height 100%
  .van-submit-bar
    bottom 50px
</style>