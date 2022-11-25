<template>
  <div>
    <!-- ceckbox中的 全选反选 -->
    <van-checkbox-group v-model="checked" ref="checkboxGroup">
        
      <div v-for="item in shopList" :key="item.id" class="item-shop">
        <!-- 选择框 -->
        <van-checkbox :name="item"/> 
      
        <!-- 滑动单元格 -->
        <van-swipe-cell>
            <van-card
                :price="item.price+'.00'"
                :title="item.name"
                class="goods-card"
                :thumb="item.img"
            >
              <template #footer>
                <!-- 步进器 数量加减 -->
                 <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
              </template>
            </van-card>

            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="handleDel(item.id)"/>
            </template>
        </van-swipe-cell>
        
      </div>
  
    </van-checkbox-group>    

    <!-- 提交订单栏 -->
    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
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
            console.log(this.$store.state)
            return this.$store.state.shop.shopList
        },
        // 计算商品总价
        allPrice(){
          // console.log(this.checked)
          // 使用js中的reduce函数 来计算总价
          if(this.checked.length){
            // 当有商品被选中时 计算选中商品的总价格
            return this.checked.reduce((prev,next)=>{
              // console.log(next,'next________')
              return prev + next.count * next.price
            },0) * 100
          }
          return 0
        }
    },
    data() {
        return {
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
        // 点击提交订单的事件
        onSubmit(){

        },
        //点击删除触发的事件
        handleDel(id){
          // console.log(id)
          // 通知shop模块下 执行一个删除的函数 delShop 
          this.$store.commit('shop/delShop',id)
          // 把 checked 数组里的商品删掉 因为该页面计算的总价 是基于checked数组计算的
          let index = this.checked.findIndex(item=> item.id == id)
          this.checked.splice(index,1)
        }
    },
}
</script>

<style lang="scss">
    .van-checkbox-group{
      max-height: calc(100vh - 150px);
      overflow: auto;
      .item-shop{
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        border: 1px solid #eee;
        overflow: hidden;
        margin: 5px auto;
        width: 95%;
        .van-swipe-cell{
          flex: 1;
          position: relative;
          .van-card__footer{
            position: absolute;
            right: 10px;
            top: 45px;  
          }
        }
        .van-checkbox{
          margin: 10px;
        }
      }
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