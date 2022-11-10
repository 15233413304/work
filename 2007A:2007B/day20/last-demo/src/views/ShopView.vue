<template>
  <div>
    <!-- 加入购物车的商品 -->
    <div v-for="item in list" :key="item.id" class="item-shop">
      <van-checkbox v-model="item.isCheck" @change="changeCheck(item.isCheck,item.id)"></van-checkbox>
      <van-swipe-cell>
        <van-card
          :num="item.count"
          :price="item.price"
          :desc="item.content"
          :title="item.title"
          class="goods-card"
          :thumb="item.img"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
       </van-swipe-cell>
    </div>
    <!-- 计算总价 -->
    <van-submit-bar :price="$store.getters.allPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox :value="checked" @click="checkAll">全选</van-checkbox>
      <van-button size="mini" @click="checkOther">反选</van-button>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  computed:{
    list(){
      return this.$store.state.carList
    },
    // 全选按钮的选中状态
    checked(){
      // 如果所有购物车商品都选中了 全选就变成true
      if(this.list.every(item=> item.isCheck)){
        return true
      }
      return false
    }
  },
  methods:{
    // 选中单个商品
    changeCheck(check,id){
      this.$store.commit('changeCheck',{check,id})
    },
    // 点击提交订单按钮
    onSubmit(){

    },
    // 点击全选按钮
    checkAll(){
      // 如果当前全选按钮是选中 取消全选 如果没有全选 全部选中
      this.$store.commit('checkAll', !this.checked)
    },
    checkOther(){
      this.$store.commit('checkOther')
    }
  }
}
</script>

<style lang="scss">
  .item-shop{
    display: flex;
    align-items: center;
    padding-left: 15px;
    .van-swipe-cell{
      width: 90%;
    }
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
</style>