<template>
  <div>
    <ul>
      <li v-for="item in treeData" :key="item.id" @click.stop="handleItem(item.id)">
        {{item.title}}
        <TreeComponent v-if="item.children && item.children.length" :treeData="item.children" @clickTreeComponent="clickTree" @clickTreeItem="handleItem"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    treeData:{
      type: Array,
    }
  },
  methods: {
    handleItem(id) {
      // 通知父组件执行自定义函数 传递一个参数过去  
      // this.$emit('自定义函数名', 传递过去的参数 )
      console.log(id)
      this.$emit('clickTreeComponent',id)
    },
    clickTree(id){
      
      this.$emit('clickTreeItem',id)
    }
  },
}
</script>

<style>

</style>