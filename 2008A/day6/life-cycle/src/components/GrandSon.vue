<template>
  <div>我是孙组件</div>
</template>

<script>
export default {
  // 生命周期 ——> 组件从创建到销毁的过程
  // 实例创建前 拿不到this.xxx
  beforeCreate() {
    console.log("孙组件————————————————beforeCreate");
  },
  // 实例创建后
  created() {
    console.log("孙组件————————————————created");
  },
  // 实例挂载前 此时页面还未渲染
  beforeMount() {
    console.log("孙组件————————————————beforeMount");
  },
  // 实例挂载后 此时页面渲染完毕 但不保证子组件完成渲染
  mounted() {
    console.log("孙组件————————————————mounted");
    // vue提供的一个函数 可以保证所有组件都渲染完毕后执行
    console.log("小明");
    this.$nextTick(() => {
      console.log("啊亮");
    });
  },
  // 页面更新前  数据已经更新了 但最新的DOM还没有更新
  beforeUpdate() {
    console.log("孙组件————————————————beforeUpdate");
    // debugger
  },
  // 页面更新后  数据更新了 页面也重新渲染了
  updated() {
    // debugger
    console.log("孙组件————————————————updated");
  },
  // 组件实例销毁前
  beforeDestroy() {
    console.log("孙组件————————————————beforeDestroy");
  },
  // 组件实例销毁后
  destroyed() {
    console.log("孙组件————————————————destroyed");
  },
};
</script>

<style></style>
