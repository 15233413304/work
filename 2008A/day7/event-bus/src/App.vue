<template>
  <div>
    老板的钱包：{{MyMoney}}
    <Admin/>
  </div>
</template>

<script>
import Admin from '@/components/Admin.vue'
export default {
  components:{
    Admin
  },
  data(){
    return{
      MyMoney:10000000,
      list:[
        {
          job: '这个月完成后台项目搭建',
          money:20000,
          endMoney:-10000
        },
        {
          job: '这个月完成可视化大屏项目搭建',
          money:10000,
          endMoney:1000
        },
        {
          job: '这个月我想撒点钱',
          money:1000000,
          endMoney:-1000000
        }
      ]
    }
  },
  created(){
    this.$bus.$on('jobIsOk', money =>{
      if(this.MyMoney <= -10000000 || this.MyMoney ==='???'){
        this.MyMoney = '???'
        alert('老板跳楼了')
        return
      }
      this.MyMoney += money
     })

    // console.log(this.$bus.$emit)
    // this.$bus.$emit('派发一个函数名', 要发过去的数据 )
    // $nextTick可以保证在所有组件渲染完毕才执行 也就是所有组件都执行完mounted生命周期才会执行 其实就是一个异步函数
    this.$nextTick(() => {
      this.$bus.$emit('sendList',this.list)
    })
  },
  mounted(){

  }
}
</script>

<style>

</style>