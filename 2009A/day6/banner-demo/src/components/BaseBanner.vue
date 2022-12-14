<template>
  <div>
    轮播图组件
    <div v-for="(item,index) in BannerList" :key="index">
        <img :src="item" alt="" v-show="banerIndex == index">
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // 当前轮播图的下标
            banerIndex: 0,
            // 定义一个开关来清除定时器
            playFlag:false
        }
    },
  // 通过props属性来接收传递过来的值
//   官网极不推荐的写法
//   props:['banner'],
//   官网推荐的写法
  props:{
    // 父组件自定义属性要和这个名字对应上 父组件通过xx-xx 传过来的属性 可以使用大驼峰写法
    BannerList:{
        // 类型校验 就是js中的类型 首字母大写
        type:Array,
        // 是否必传 如果设置为true 就是一定需要传来的值 不传会报一个错
        required: true
    },
    AutoTime:{
        type: Number,
        // 设置一个默认值 当父组件不传过来值的时候 使用默认值
        // 如果父组件传过来这个属性 那就使用父组件传过来的值
        default:()=> 1000
        // default(){
        //     return 1000
        // }
        // default:()=>{
        //     return 1000
        // }
    }
  },
  methods:{
    AutoPlay(){
      if(this.playFlag){
        let Timer = setInterval(()=>{
          if(this.banerIndex < this.BannerList.length-1){
            this.banerIndex ++
          }else{
            this.banerIndex = 0
          }
          if(!this.playFlag){
            clearInterval(Timer)
          }
          // console.log(this.banerIndex)
        },this.AutoTime)
      }
    }
  },
  // 生命周期 ： 组件从创建到销毁的过程 就是生命周期
  // 实例创建前 执行的生命周期钩子函数 获取不到vue里的实例
  // data里的属性，methods里的属性，computed里的属性 watch里的属性 在这个阶段都不会生效
  beforeCreate(){
    console.log('Banner___beforeCreate')
  },
  // 实例创建后 此时 vue的实例已经创建完毕 this.xxx 都可以使用了
  created(){
    console.log('Banner___created')
    this.playFlag = true
    this.AutoPlay()
  },
  // 实例挂载前 页面完成渲染前
  beforeMount(){
    console.log('Banner___beforeMount')
  },
  // beforeMount => mounted 这个过程中 会渲染子组件
  // 实例挂载后 页面完成渲染
  mounted(){
    console.log('Banner___mounted')
  },
  // 页面更新前 数据已经更新了 页面还没有更新
  beforeUpdate(){
    // console.log('Banner___beforeUpdate')

  },
  // 页面更新后 数据和页面此时都更新完毕了
  updated(){
    // console.log('Banner___updated')

  },
  // 组件销毁前
  beforeDestroy() {
    console.log('Banner___beforeDestroy')
    this.playFlag = false
  }, 
  // 组件销毁后
  destroyed(){
    console.log('App___destroyed')
    
  }

}
</script>

<style>

</style>