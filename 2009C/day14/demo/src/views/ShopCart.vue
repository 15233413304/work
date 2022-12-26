<template>
  <div>
    <div v-if="list.length">
      <!-- 复选框 -->
      <van-checkbox-group v-model="checkList" ref="checkboxGroup">
        <!-- 每个商品外面的大盒子 -->
        <div class="card-item" v-for="item in list" :key="item.id">
           <!-- 每个商品的单选框 -->
           <van-checkbox :name="item" />
           <!-- 滑动单元格 -->
            <van-swipe-cell>
              <!-- 商品卡片 -->
              <van-card
                :price="`${item.price}.00`"
                desc="描述信息"
                :title="item.name"
                class="goods-card"
                :thumb="item.img"
              >
                <template #num>
                  <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
                </template>
              </van-card>
            <!-- 滑动单元格的右边 左滑显示的按钮的插槽 -->
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="handleDel(item.id)"/>
            </template>
          </van-swipe-cell>
        </div>
      </van-checkbox-group>
      
      
      <!-- 提交订单栏 -->
      <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
        <van-button type="primary" size="mini" @click="checkAll">全选</van-button>
        <van-button type="info" size="mini" @click="toggleAll">反选</van-button>
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
      // 选中的商品
      checkList:[]
    }
  },
  computed:{
    list(){
      return this.$store.state.cartList
    },
    // 计算总价
    allPrice(){
      return this.checkList.reduce((prev,next)=>{
        return prev + next.count * next.price
      },0) *100
    }
  },
  methods:{
    // 点击全选按钮
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    // 点击反选按钮
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    // 点击删除按钮
    handleDel(id){
      // 调用vuex 中同步方法 delShop 来删除购物车中的这个商品
      this.$store.commit('delShop',id)
      // 将checkList中的商品删除掉 
      let index = this.checkList.findIndex(item=> item.id == id)
      this.checkList.splice(index,1)
    },
    onSubmit(){

    }
  }
}
</script>

<style lang="scss">
  .van-empty{
    margin-top: 100px;
  }
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .van-submit-bar{
    bottom: 50px;
  }
  .card-item{
    display: flex;
    padding-left: 10px;
    .van-swipe-cell{
      flex: 1;
    }
    .van-stepper{
      margin-top: -30px;
    }
  }
</style>