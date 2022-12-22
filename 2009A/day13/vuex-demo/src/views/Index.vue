<template>
  <div class="container">
    <button @click="add">+</button>
    <p>{{ count }}</p>
    <button @click="cur">-</button>
  </div>
</template>

<script>
export default {
    // data(){
    //     return {
    //         count:0
    //     }
    // },
    created(){
        this.$store.dispatch('getCount')
    },
    computed:{
        count(){
            // this.$store.state.count 获取到vuex中 state里的count
            return this.$store.state.count
        }
    },
    methods:{
        add(){
            // this.$store.state.count++ 
            // 通知vuex执行同步方法 mutations里的方法
            // this.$store.commit('事件名',参数)
            this.$store.commit('addCount',1)
        },
        cur(){
            // this.$store.state.count--
            this.$store.commit('curCount',1)
        },
    }
}
</script>

<style lang="stylus">
.container
    display flex
    justify-content space-evenly
    p
      margin 0
      padding 0
</style>