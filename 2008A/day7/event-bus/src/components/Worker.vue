<template>
  <div>
    打工人的钱包：
    <div>
        任务：
        <p v-for="(item,index) in list" :key="index">{{item.job}}<button @click="isOk(item)">完成任务一次</button></p> 
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            money:1000,
            list:[]
        }
    },
    created(){
        // this.$bus.$on('sendList', 回调函数 回调函数里接收派发的值）
        // 注意⚠️ 监听需要早于 派发过来的事件 
        this.$bus.$on('sendList', list =>{
            console.log(list)
            this.list = list
        })
    },
    methods:{
        isOk(item){
            this.money += item.money
            this.$bus.$emit('jobIsOk',item.endMoney)
        }
    }
}
</script>

<style>

</style>