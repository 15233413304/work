<template>
  <div>
      {{title}}
  </div>
</template>

<script>
export default {
    // 父组件传过来了一个tilte属性
    props:['title']
    // beforeCreate(){
    //   console.log('孙子组件的beforeCreate')
    // },
    // created(){
    //   console.log('孙子组件的created')
    // },
    // beforeMount(){
    //   console.log('孙子组件的beforeMount')
    // },
    // mounted(){
    //   console.log('孙子组件的mounted') 
    // },
    // beforeUpdate(){
    //   console.log('孙子组件的beforeUpdate')
    // },
    // updated(){
    //   console.log('孙子组件的updated')

    // },
    // beforeDestroy(){
    //   console.log('孙子组件的beforeDestroy')
    // },
    // destroyed(){
    //   console.log('孙子组件的destroyed')
    // },
}
</script>

<style>

</style>