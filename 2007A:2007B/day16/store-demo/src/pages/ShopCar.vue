<template>
  <div v-if="carList.length">
    <!-- {{carList}} -->
    <div class="item-card" v-for="item in carList" :key="item.id">
       <div class="check">
         <van-checkbox v-model="item.isCheck" @change="handleItem(item.id,item.isCheck)"/>
       </div>
       <van-swipe-cell>
          <template #default>
            <van-card
              :price="item.price"
              desc="xxxxxxxx"
              :title="item.name"
              class="goods-card"
              :thumb="item.img"
            />
            <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
          </template>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="del(item.id)"/>
          </template>
        </van-swipe-cell>
    </div>

    <van-submit-bar :price="$store.getters.allPrice*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="isCheckAll" @click="checkAll">全选</van-checkbox>
      <van-button size='mini' @click="handleOther">反选</van-button>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
    <!-- {{carList}} -->
  </div>
  <div v-else>
    <van-empty
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品"
    />
  </div>
</template>

<script>
export default {
  computed:{
    carList(){
      return this.$store.state.carList
    }
  },
  data(){
    return{
      isCheckAll:false,
    }
  },
  created(){
    this.isCheckAll = this.carList.every(item=> item.isCheck)
  },
  methods:{
    onSubmit(){
      
    },
    onClickEditAddress(){

    },
    // 点击全选
    checkAll(){
      this.$store.commit('checkAll',this.isCheckAll)
    },
    // 点击单选
    handleItem(id,isCheck){
      this.isCheckAll = this.carList.every(item=> item.isCheck)
      this.$store.commit('checkItem',{id,isCheck})
    },
    // 反选
    handleOther(){
      this.$store.commit('checkOther')
    },
    // 删除
    del(id){
      this.$store.commit('deleteItem',id)
    }
  }
}
</script>

<style lang="scss" scoped>
  :deep(.goods-card){
    margin: 0;
    background-color: white;
  }

  :deep(.delete-button) {
    height: 100%;
  }

  .custom-image:deep(.van-empty__image) {
    padding-top: 100px;
    width: 90px;
    height: 90px;
  }

  .item-card{
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    align-items: center;
    width: 100%;
    .van-swipe-cell{
      flex: 1;
    }
  }

  .van-submit-bar{
    bottom: 50px;
  }
</style>