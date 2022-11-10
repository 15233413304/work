<template>
  <div id="app">
    <!-- <MyChild v-if="count<10"/>
    {{count}}
    <button @click="changeCount">改变count</button>
    {{count2}}
    <PublicCompon :title="'子组件'"/> -->

    <Parent/>
  </div>
</template>

<script>
// import MyChild from "@/components/MyChild.vue";
import Parent from "@/components/Parent.vue";

export default {
  name: "App",
  components: {
    // MyChild,
    Parent,
  },
  data(){
    return {
      count: 0,
      count2: 0,
    }
  },
  methods:{
    add(){
      return 1
    },
    changeCount(){
      this.count++
    }
  },
  // 在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用。
  // 不能使用 watch、computed、methods、methods里的事件和回调函数，data
  beforeCreate(){
    console.log(this.count,'beforeCreate')
  },
  // 在实例创建完成后被立即同步调用
  //可以使用 watch、computed、methods、methods里的事件和回调函数、 $el property获取不到
  created(){
    console.log(this.add(),'created')
    this.$nextTick(()=>{
      console.log('我是nextTick')
    })
  },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用
  // 咱们在页面上写的 template 被首次编译了
  beforeMount(){
    console.log(this.count,'beforeMount')
  },
  // 虚拟dom(vm.$el) 在这个阶段变成真实dom了 页面基本上渲染完毕
  // 不会保证所有的子组件也都被挂载完成 如果希望整体渲染完成后进行一些操作 那就使用this.$nextTick()
  mounted(){
    console.log(this.count,'mounted')
    // this.$nextTick(()=>{
    //   console.log('我是nextTick')
    // })
  },
  // 在数据发生改变后，DOM 被更新之前被调用。
  beforeUpdate(){
    console.log(this.count,'beforeUpdate')
    // if(this.count<10){
    //   this.count++
    // }
  },
  // 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
  updated(){
    console.log(this.count,'updated')
    if(this.count>10){
      this.count = 0
    }
    this.count2 = this.count
  },
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy(){

  },
  // 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
  destroyed(){
    
  },
};
</script>

<style lang="scss">

</style>
