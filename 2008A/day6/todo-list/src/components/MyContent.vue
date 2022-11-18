<template>
  <div>
    待完成：
    <p v-for="item in todoList" :key="item.id">
      {{item.title}} <button @click="toFinish(item.id)">完成</button>
    </p>
    <hr>
    已完成：
    <p v-for="item in doneList" :key="item.id">
      <s>{{item.title}}</s>
    </p>
  </div>
</template>

<script>
export default {
  // 通过props接收传递过来的列表
  props:{
    list:{
      // 类型校验
      type: Array
    }
  },
  computed:{
    // 待完成列表
    todoList(){
      return this.list.filter(item=> !item.isDo)
    },
    // 已完成列表
    doneList(){
      return this.list.filter(item=> item.isDo)
    },
  },
  methods:{
    // 添加到已完成列表中
    toFinish(id){
      this.$emit('toFinsh',id)
    }
  }
}
</script>

<style>

</style>