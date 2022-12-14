<template>
  <div id="app">
    <!-- 通过自定义属性传递给子组件数据 -->
    <!-- 如果不传shop-list 因为子组件中设置了required
       会报 Missing required prop: "ShopList" -->
    <!-- 父组件通过 @自定义事件名="函数" 来接收子组件传递过来的值或者逻辑 -->
    <shop-cart
      :shop-list="list"
      @checkAll="CheackAll"
      @del="handleDel"
      @add="addCount"
      @cur="curCount"
    />
  </div>
</template>

<script>
// 引入组件
import ShopCart from "@/components/ShopCart.vue";
import axios from "@/utils/http";

export default {
  components: {
    ShopCart,
  },
  data() {
    return {
      list: [],
    };
  },
  // 生命周期：组件从创建到销毁的过程就是生命周期
  // 实例创建前的生命周期钩子函数 vue实例此时还没创建
  // this.xxx 都是不可用的 new Vue() 之前
  beforeCreate() {
    console.log("App_beforeCreate");
  },
  // new Vue()之后
  // 实例创建后 此时组件中的 属性都可用了
  created() {
    console.log("App_created");
    // $nextTick() 可以保证在所有组件渲染完毕后执行
    this.$nextTick(async () => {
      // console.log("nextTick")
      // axios.get('/api/shop').then(res=>{
      //   this.list = res
      // })
      this.list = await axios.get("/api/shop");
    });
  },
  // 页面挂载前， 渲染之前 此时准备渲染子组件
  beforeMount() {
    console.log("App_beforeMount");
  },
  // beforeMount => mounted 这个过程中 会渲染子组件
  // 页面挂载后， 完成渲染了 不保证所有子组件都完成渲染
  mounted() {
    console.log("App_mounted");
  },
  // 页面更新前 只有数据改变时才会执行
  // 此时数据改变了 但页面还没有重新渲染
  beforeUpdate() {
    console.log("App_beforeUpdate");
  },
  // 页面更新后 只有数据改变并且页面完成重新渲染才会执行
  // 此时数据和页面都改变了
  updated() {
    console.log("App_updated");
  },
  // 组件销毁前 只有组件销毁时才会触发
  beforeDestroy() {
    console.log("App_beforeDestroy");
  },
  // 组件销毁后 只有组件销毁时才会触发
  destroyed() {
    console.log("App_destroyed");
  },
  methods: {
    // 点击全选
    CheackAll(check) {
      this.list.forEach((item) => {
        item.isCheck = check;
      });
    },
    // 点击删除
    handleDel(index) {
      this.list.splice(index, 1);
    },
    // 点击数量+
    addCount(index) {
      this.list[index].count++;
    },
    // 点击数量-
    curCount(index) {
      // 商品数量是否大于1
      if (this.list[index].count > 1) {
        // 大于1时 商品数量减少
        return this.list[index].count--;
      }
      // 不大于1时 提示 数量最少为1
      alert("数量最少为1");
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>