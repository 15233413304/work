<template>
  <div>
    <button @click="sendName">孙组件向祖父组件通信</button>
    <div>
        孙子的零花钱余额：{{nowMoney}}
    </div>
  </div>
</template>

<script>
import  Event from '@/minxins/EventFn'
export default {
    data(){
        return{
            name: '张三',
            nowMoney: 100
        }
    },
    mixins:[Event],
    mounted(){
        console.log('我是Children的 mounted')
        this.$eventBus.$on('Money', data =>{
            this.nowMoney += data
        })
    },
    methods:{
        sendName(){
            // 使用全局通信函数里提供的 $emit方法来派发事件
            this.$eventBus.$emit('Name',this.name)
            console.log('Children的sendName')
        }
    }
}
</script>

<style>

</style>