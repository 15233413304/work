<template>
  <div>
    <div v-for="(item,index) in list" :key="index">
      <img :src="item" v-show="tabIndex == index"/>
    </div>
  </div>
</template>

<script>
export default {
  // vue中 子组件接收父组件传过来的值 使用props
  // 官网极不推荐的写法 太low了 啥也没有 最起码要有个类型
  // props:['list']
  // 推荐写法
  props:{
    // 这个名字要和父组件中 自定义属性名字一致
    list:{
      // 类型校验 支持js中的数据类型 首字母需要大写
      type: Array,
      // 是否为必传值 如果父组件不传这个list那就报错
      required: true,
      // 设置默认值（当父组件没有传这个属性时 默认使用什么值）
      // default: ()=> []
    },
    AutoTime:{
      type: Number,
      default: ()=> 1000
    }
  },
  data(){
    return{
      tabIndex:0,
      bannerFlag: true,
    }
  },
  methods:{
    BannerPlay(){
      // 判断轮播的开关变量是否打开 如果打开了执行定时器
      if(this.bannerFlag){
        // 定义一个定时器 
        let Timer = setInterval(() => {
          console.log(this.tabIndex)
          // 判断一下 如果下标 < 总图片数-1 才执行++
          if(this.tabIndex < this.list.length-1){
            this.tabIndex++
          }else{
            // 重置 从第一张图开始轮播
            this.tabIndex = 0
          }
          // 组件销毁时会将这个开关变成false
          if(!this.bannerFlag){
            // 清除定时器
            clearInterval(Timer)
          }
        }, this.AutoTime);
      }
    },
    
  },
  // 组件创建后执行的生命周期
  created(){
    // 将轮播的开关打开
    this.bannerFlag = true
    this.BannerPlay()
  },
  // 组件销毁时触发的生命周期
  destroyed() {
    // 将轮播的开关关闭 以清除定时器
    this.bannerFlag = false
  },

}
</script>

<style>

</style>