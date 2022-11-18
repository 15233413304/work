<template>
  <div>
    我是子组件
    <hr />
    <GrandSon />
  </div>
</template>

<script>
import GrandSon from "@/components/GrandSon.vue";
export default {
  components: {
    GrandSon,
  },
  // 生命周期 ——> 组件从创建到销毁的过程
  // 实例创建前 拿不到this.xxx
  beforeCreate() {
    console.log("子组件————————————————beforeCreate");
  },
  // 实例创建后
  created() {
    console.log("子组件————————————————created");
  },
  // 实例挂载前 此时页面还未渲染
  beforeMount() {
    console.log("子组件————————————————beforeMount");
  },
  // 实例挂载后 此时页面渲染完毕 但不保证子组件完成渲染
  mounted() {
    console.log("子组件————————————————mounted");
  },
  // 页面更新前  数据已经更新了 但最新的DOM还没有更新
  beforeUpdate() {
    console.log("子组件————————————————beforeUpdate");
    // debugger
  },
  // 页面更新后  数据更新了 页面也重新渲染了
  updated() {
    // debugger
    console.log("子组件————————————————updated");
  },
  // 组件实例销毁前
  beforeDestroy() {
    console.log("子组件————————————————beforeDestroy");
  },
  // 组件实例销毁后
  destroyed() {
    console.log("子组件————————————————destroyed");
  },
};
</script>

<style></style>
