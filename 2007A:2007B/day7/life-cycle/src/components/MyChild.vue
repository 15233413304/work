<template>
  <div>
    我是子组件
    <hr>
    <PublicCompon :title="'孙子组件'"/>
  </div>
</template>

<script>
// import GrandSon from '@/components/GrandSon.vue'
export default {
    components:{
      // GrandSon
    },
    beforeCreate(){
      console.log('子组件的beforeCreate')
    },
    created(){
      console.log('子组件的created')
    },
    beforeMount(){
      console.log('子组件的beforeMount')
    },
    mounted(){
      console.log('子组件的mounted') 
    },
    beforeUpdate(){
      console.log('子组件的beforeUpdate')
    },
    updated(){
      console.log('子组件的updated')

    },
    beforeDestroy(){
      console.log('子组件的beforeDestroy')
    },
    destroyed(){
      console.log('子组件的destroyed')
    },
}
</script>

<style>

</style>