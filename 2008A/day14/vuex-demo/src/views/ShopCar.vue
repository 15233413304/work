<template>
  <div>
    <!-- ceckbox中的 全选反选 -->
    <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-checkbox v-for="item in shopList" :key="item.id" :name="item.id">
            <!-- 滑动单元格 -->
            <van-swipe-cell>
                <van-card
                    :num="item.count"
                    :price="item.price+'.00'"
                    :title="item.name"
                    class="goods-card"
                    :thumb="item.img"
                />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </van-checkbox>
    </van-checkbox-group>    

    <!-- 提交订单栏 -->
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-button 
            type="default" 
            size="mini"
            @click="checkAll">
            全选
        </van-button>
        <van-button 
            type="default" 
            size="mini"
            @click="toggleAll">
            反选
        </van-button>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
    computed:{
        shopList(){
            // console.log(this.$store.state.shop.shopList)
            return this.$store.state.shop.shopList
        }
    },
    data() {
        return {
          result: [],
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
        // 点击提交订单的事件
        onSubmit(){

        }
    },
}
</script>

<style lang="scss">
  .van-checkbox__label{
    flex: 1;
  }
  .van-submit-bar{
    bottom: 50px;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
</style>