<template>
  <div>
    购物车
    <table width="800" class="shop-tab" v-if="shop.length">
      <tr>
        <th>
          全选：
          <input type="checkbox" v-model="isCheckAll" @change="handleAll" />
        </th>
        <th>商品名</th>
        <th>商品图片</th>
        <th>商品价格</th>
        <th>商品数量</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in shop" :key="item.id" align="center">
        <td>
          <!-- 商品的单选按钮 -->
          <input 
            type="checkbox"
            v-model="item.isCheck" 
            @change="handleItem"
            />
        </td>
        <td>{{ item.name }}</td>
        <td><img :src="item.img" /></td>
        <td>{{ item.price }}¥</td>
        <td>
          <button @click="$emit('handleCur',index)">-</button>
          {{ item.count }}
          <button @click="$emit('handleAdd',index)">+</button>
        </td>
        <td><button @click="$emit('del',index)">删除</button></td>
      </tr>
      <tr>
        <td>总价：</td>
        <td colspan="5">{{allPrice}}</td>
      </tr>
    </table>
    <div v-else>
      ————————   暂无数据    ———————— 
    </div>
  </div>
</template>

<script>
export default {
  // props里的数据一定不要直接改 props只负责接收传过来的数据
  // 想要改变原数据一定要通过父组件改变
  props: {
    shop: {
      type: Array,
      required: true,
    },
  },
  computed:{
    allPrice(){
        // 筛选出选中的商品
        let list = this.shop.filter(item=> item.isCheck)
        // 计算选中商品的总价
        return list.reduce((prev,next)=>{
            return prev + next.count * next.price
        },0)
    }
  },
  data() {
    return {
      // 全选的选中状态
      isCheckAll: false,
    };
  },
  methods: {
    // 点击全选
    handleAll() {
        // 子传父 通知父组件执行一个自定义事件
        // this.$emit('自定义事件',需要传递的参数)
        this.$emit('changeCheck',this.isCheckAll)
    },
    // 点击单选
    handleItem(){
       // 全选按钮需要满足 所有单选都选中
       this.isCheckAll = this.shop.every(item=> item.isCheck)
    },
  },
};
</script>

<style lang="scss">
.shop-tab{
    border-collapse: collapse;
    border: none;
    td,th{
        border: 1px solid;
    }
}

</style>