<template>
  <div class="shop" v-if="list.length">
    <van-checkbox-group v-model="checked" ref="checkboxGroup">
      <div class="item-card" v-for="(item,index) in list" :key="item.id">
        <!-- 单选商品 -->
        <van-checkbox :name="item"/>
        <!-- 商品卡片 使用滑动单元格渲染 -->
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
            <van-button square text="删除" type="danger" class="delete-button" @click="delShop(index,item.id)" />
          </template>
        </van-swipe-cell>
      </div>
    </van-checkbox-group>

    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
      <van-button type="primary" @click="checkAll" size="mini">全选</van-button>
      <van-button type="info" @click="toggleAll" size="mini">反选</van-button>
      <template #tip v-if="defaultCity?.city != '北京市'|| !defaultCity">
           {{tipText}}, <span @click="onClickAddress">{{editText}}</span>
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
import { Dialog, Toast } from 'vant'
export default {
  computed:{
    list(){
      return this.$store.state.cart.cartList
    },
    defaultCity(){
      return this.$store.state.address.list[0]
    },
    tipText(){
      if(!this.defaultCity){
        return '你还没有设置收货地址'
      }
      if(this.defaultCity?.city != '北京市'){
        return '你的收货地址不支持同城送'
      }
    },
    editText(){
      if(!this.defaultCity){
        return '新增地址'
      }
      if(this.defaultCity?.city != '北京市'){
        return '修改地址'
      }
    },
    allPrice(){
      // reduce会循环数组 并进行计算   reduce((上一次计算的结果,下一次循环的item)=>{},初始值)
      // prev 是拿到上一次计算的结果 第一次循环时 prev是初始值
      // next 相当于item
      // return this.checked.reduce((prev,next)=>{
      //   return prev + next.count * next.price
      // },0) * 100

      // 如果用 forEach写计算总价方法
      let price = 0
      this.checked.forEach(item=>{
        price += item.count * item.price
      })
      return price * 100
    }
  },
  data() {
    return {
      // 选中的商品列表
      checked: [],
    };
  },
  methods: {
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
    onClickAddress(){
      // 编辑地址
      if(this.defaultCity?.id){
        return this.$router.push(`/create/address?id=${this.defaultCity?.id}`)
      }
      //新增地址
      this.$router.push('/create/address')
    },
    // 删除商品
    delShop(index,id){
        Dialog.confirm({
          title: '提示',
          message: '确认删除改商品吗？',
        })
        .then(() => {
          // on confirm
          this.$store.commit('cart/delShop',index)
          let idx = this.checked.findIndex(item=> item.id == id)
          if (idx>-1){
            this.checked.splice(idx,1)
          }
          Toast.success('删除成功')
        })
        .catch(() => {
          // on cancel
          Toast('取消删除')
        });
    }
  },
}
</script>

<style lang="stylus">
.shop
  background #f5f5f5
  height 100%
  .item-card
    width 90%
    display flex
    background #fff
    border-radius 10px
    padding 10px
    margin 0 auto 10px
    .van-checkbox
      min-width 30px
    .van-card
      background white
  .goods-card
    margin 0
    background-color @white
  .delete-button
    height 100%
  .van-submit-bar
    bottom 50px
    &__tip
      span
        color blue
</style>