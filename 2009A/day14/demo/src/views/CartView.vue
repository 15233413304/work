<template>
  <div>
    <div v-if="list.length">
      <!-- 复选框 -->
      <van-checkbox-group v-model="checkList" ref="checkboxGroup">
        <div v-for="item in list" :key="item.id" class="item-shop">
            <!-- 单选 -->
            <van-checkbox :name="item" />
            <!-- 滑动单元格 -->
            <van-swipe-cell>
              <!-- 商品卡片 -->
              <van-card
                  :price="`${item.price}.00`"
                  :title="item.name"
                  class="goods-card"
                  :thumb="item.img"
              >
                <!-- 商品卡片的插槽 -->
                <template #num>
                  <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
                </template>
              </van-card>
                <!-- 滑动单元格的插槽 -->
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="handleDel(item.id)"/>
                </template>
            </van-swipe-cell>
          </div>
      </van-checkbox-group>
       
      <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit" >
        <van-button type="primary" @click="checkAll" size="mini">全选</van-button>
        <van-button type="info" @click="toggleAll" size="mini">反选</van-button>
      </van-submit-bar>
    </div>
    <van-empty
        v-else
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无商品"
    />

  </div>
</template>

<script>
export default {
    data(){
      return{
        checkList:[]
      }
    },
    computed:{
        list(){
            return this.$store.state.cartList
        },
        // 计算总价
        allPrice(){
          console.log(this.checkList)
          return this.checkList.reduce((prev,next)=>{
            return prev + next.count * next.price
          },0)*100
        }
    },
    methods:{
      // 全选
      checkAll(){
        this.$refs.checkboxGroup.toggleAll(true);
      },
      // 反选
      toggleAll(){
        this.$refs.checkboxGroup.toggleAll();
      },
      // 点击删除
      handleDel(id){
        // 在vuex中的 购物车列表中删掉这个商品
        this.$store.commit('delShop',id)
        // 要从选中商品列表中 删掉这个商品 使computed 重新计算
        let index = this.checkList.findIndex(item => item.id == id)
        this.checkList.splice(index,1)
      },
      onSubmit(){

      }
    }
}
</script>

<style lang="stylus">
  .item-shop
    display flex
    padding-left 10px
    .van-swipe-cell
      flex 1
  .goods-card
    margin 0
    background-color white
  .delete-button
    height 100%
  .van-empty
    margin-top 100px
    
  .custom-image .van-empty__image
    width 90px
    height 90px
  .van-submit-bar
    bottom 50px
  .van-stepper
    margin-top -30px
  
</style>