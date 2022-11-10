<template>
  <div>
    <p v-for="item in actions" :key="item.id" @click="clickItem(item.title)">{{item.title}}</p>
    <hr v-if="history.length">
    <div v-if="history.length">
        历史记录：<button @click="clearHistory">清空</button>
        <p v-for="(item,index) in history" :key="item" @click="clickItem(item)">{{item}} <span @click="del(index)">X</span></p>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        actions:{
            type: Array,
            required: true,
        }
    },
    computed:{
        history(){
            return this.$store.state.searchHistory
        }
    },
    methods:{
        clickItem(title){
            this.$emit('clickItem',title)
        },
        del(index){
            this.$store.commit('delHistory',index)
        },
        clearHistory(){
            this.$store.commit('clearHistory')
        }
    }
}
</script>

<style scoped>
p{
    border-bottom: 1px solid #ccc;
}
</style>