<template>
  <div>
    {{ count }}
    <button @click="handleBtn">点我</button>
    <hr />
    <TheChildren v-if="showChildren" />
  </div>
</template>
<script>
import TheChildren from "@/components/TheChildren.vue";
export default {
  components: {
    TheChildren,
  },
  // 存放数据 状态 这里写的数据都会存放在vue实例里 this.list
  data() {
    return {
      list: [],
      showChildren: true,
    };
  },
  // 存放自定义函数的混入对象 这里写的函数都会存放在vue实例里 this.getList()
  methods: {
    getList() {
      this.list = [1, 2, 3];
    },
    handleBtn() {
      this.list.push(this.list.length + 10);
    },
  },
  // 计算属性 这里写的函数 可以计算后返回一个值 返回值的键名就是函数名  this.count
  computed: {
    count() {
      return this.list.length;
    },
  },
  // 监听 可以监听vue实例里的任何值
  watch: {
    // 我们要监听的vue实例里的值
    count: {
      handler(value, oldValue) {
        console.log(value, oldValue);
      },
      // 深度监听
      // deep: true,
      // 是否第一次进页面就执行
      // immediate: true
    },
  },
  // 生命周期 ——> 组件从创建到销毁的过程
  // 实例创建前 拿不到this.xxx
  beforeCreate() {
    console.log(this.list, "-----------beforeCreate");
  },
  // 实例创建后
  created() {
    // this.list.push(1)
    // 可以在created里调用接口
    // 赋值给data里的数据
    this.getList();
    console.log(this.list, "------------created");
  },
  // 实例挂载前 此时页面还未渲染
  beforeMount() {
    console.log(this.list, "-----------beforeMount");
  },
  // 实例挂载后 此时页面渲染完毕 但不保证子组件完成渲染
  mounted() {
    console.log(this.list, "-----------mounted");
    // this.showChildren = false
  },
  // 页面更新前  数据已经更新了 但最新的DOM还没有更新
  beforeUpdate() {
    console.log(this.count);
    // debugger
  },
  // 页面更新后  数据更新了 页面也重新渲染了
  updated() {
    // debugger
    console.log("updated");
  },
  // 组件实例销毁前
  beforeDestroy() {},
  // 组件实例销毁后
  destroyed() {},
};
</script>
<style></style>
