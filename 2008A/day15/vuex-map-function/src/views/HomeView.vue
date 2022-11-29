<template>
  <div>
    姓名：{{name}}
    {{list}}
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
    // data(){
    //     return {
    //         list:[]
    //     }
    // },
    // computed:{
    //     list(){
    //         return this.$store.state.list
    //     }
    // },

    // 使用mapState辅助函数
    computed:{
        // mapState 会将 vuex中的 state里的属性 映射过来 作为 this.xxx 来使用
        ...mapState(['list','name'])
    },
    methods:{
        ...mapActions(['getList']),
        // fetchList(){
        //     this.$store.dispatch('getList')
        //     // this.$store.dispatch('getList').then(()=>{
        //     //     this.list = this.$store.state.list
        //     // })
        // }
    },
    created(){
        // this.fetchList()
        this.getList()
    },
}
</script>

<style>

</style>