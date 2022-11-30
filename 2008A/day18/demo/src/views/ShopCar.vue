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
            <van-button square text="删除" type="danger" class="delete-button" @click="handleDel(item.id)"/>
          </template>
        </van-swipe-cell>
      </div>
    </van-checkbox-group>
    <van-empty v-if="!shopList.length" description="暂无商品" />

    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
      <!-- <van-checkbox  :value="checked.length == shopList.length" @click="checkAll">全选</van-checkbox> -->
      <van-button type="info" size="mini" @click="checkAll">全选</van-button>

      <van-button type="info" size="mini" @click="toggleAll">反选</van-button>
      <template #tip v-if="!MyCity">
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import {Toast} from 'vant'
export default {
  data(){
    return{
      // 选中的商品
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
    },
    //当前城市是不是同城
    MyCity(){
      return this.$store.state.addressList[0]?.address.includes('北京')
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
      let id = this.$store.state.addressList[0].id
      this.$router.push(`/address/edit?id=${id}`)
    },
    onSubmit(){
      if(!this.$store.state.addressList.length){
        return Toast.fail('请设置收获地址')
      }
      if(!this.MyCity){
        return Toast.fail('您的收获地址暂不支持，请修改收获地址')
      }
      // 判断 有没有选中商品
      if(this.checked.length){
        // 提交订单 存到订单列表里
        this.$store.commit('setSubmit',this.checked)
        Toast.loading({
          duration: 3000,
          message: '订单支付中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        setTimeout(() => {
          // 订单支付成功后 需要批量删除选中的商品
          this.checked.forEach(item=>{
              // 可能会删除多个 需要一个循环时间 所以要用异步
              this.$store.dispatch('delSubmitShop',item.id)
              // 清空选中商品
              this.checked = []
          })
          Toast.success('支付成功')
          this.$router.push('/my')
        }, 3000);
        return
      }
      Toast.fail('没有选中任何商品啊～');
    },
    handleDel(id){
      this.$store.commit('delShop',id)
      let index = this.checked.findIndex(item=> item.id == id)
      if(index != -1){
        this.checked.splice(index,1)
      }
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