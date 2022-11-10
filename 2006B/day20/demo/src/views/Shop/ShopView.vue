<template>
  <div>
    <nav-bar :navName="'购物'" :hasBack="true" @back="$router.go(-1)"></nav-bar>
    <div v-if="list.length">
      <van-checkbox-group v-model="result">
              <div v-for="(item) in list" :key="item.id" class="item-shop">
                <van-checkbox :name="item" />
                <van-card
                    :num="item.num"
                    :price="item.price"
                    desc="描述信息"
                    :title="item.title"
                    :thumb="item.img"
                  >
                  <template #footer>
                    <van-button size="mini" @click="cut(item.id)">-</van-button>
                    <van-button size="mini" @click="add(item.id)">+</van-button>
                    <van-button size="mini" @click="del(item.id)">删除</van-button>
                  </template>
               </van-card>
            </div>      
      </van-checkbox-group>
      <van-submit-bar :price="allPrice.toFixed(2)*100" button-text="提交订单">
        <van-checkbox v-model="checkedAll" @click="handleCheckAll" @change="changeCheckAll">全选</van-checkbox>
        <van-button @click="handleCheckOther" size="mini">反选</van-button>
      </van-submit-bar>
    </div>
    <div v-else>
      <van-empty description="暂无购物列表" />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { mapState } from 'vuex';
import { debounce} from '@/utils/utils'
export default {
  components:{
    NavBar
  },
  data() {
    return {
      result: [],
      oldResult:[],
      // 全选
      checkedAll: false,
    };
  },
  computed:{
    ...mapState('shop',['list']),
    // list(){
    //   return this.$store.state.shop.list
    // }
    // 计算总价
    allPrice(){
      return this.result.reduce((pre,next)=>{
        return pre + next.num * next.price
      },0)
    }
  },
  watch:{
    result:{
      handler(newVal){
        if(newVal.length === this.list.length){
          this.checkedAll = true
        }else{
          this.oldResult = newVal
          this.checkedAll = false
        }
      },
      deep: true,
    }
  },
  methods:{
    add:debounce(function(id){
       this.$store.commit('shop/addShopNum',id)
    }),
    cut:debounce(function(id){
       this.$store.commit('shop/cutShopNum',id)
    }),
    del(id){
      Dialog.confirm({
      title: '删除',
      message:
        '你确定要删除这个商品吗？',
      })
      .then(() => {
        // on confirm
        this.$store.commit('shop/delShopItem',id)
      })
      .catch(() => {
        // on cancel
        Toast('取消删除')
      });
    },
    // 全选
    handleCheckAll(){
      if(this.checkedAll){
        this.result = this.list
      }else{
        this.result = []
      }
    },
    changeCheckAll(){
      if(!this.checkedAll){
        this.result = this.oldResult
      }
    },
    // 反选
    handleCheckOther(){
      let idArr = []
      // 将以选中的列表的每一项id存到一个新数组中
      this.result.forEach(item =>{
        idArr.push(item.id)
      })
      this.result = this.list.filter(item => !idArr.includes(item.id))
    }
  }
}
</script>

<style scoped>
.item-shop{
  display: flex;
}
.van-checkbox{
  border: 1px solid #fafafa;
  border-radius: 5px;
  padding: 0 5px;
  margin: 5px 0;
}
.van-card{
  background: #fff;
  flex: 1;
}
</style>