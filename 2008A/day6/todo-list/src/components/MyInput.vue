<template>
  <div>
    <input v-model="inputValue"/>
    <button @click="addJob">添加任务</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            inputValue:''
        }
    },
    methods:{
        addJob(){
            // console.log(this.inputValue)
            // 通知父组件添加任务
            this.$emit('addJob',{
                title: this.inputValue,
                isDo: false
            })
        }
    }
}
</script>

<style>

</style>