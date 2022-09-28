<template>
  <div>
    <el-tabs v-model="currentName" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in type" :key="index" 
        :label="item" :name="`name_${item}`">{{item}}</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import { /* mapActions, */ mapState } from 'vuex';
export default {
    data(){
        return {
            currentName:'name_a'
        }
    },
    methods:{
        // ...mapActions('H',['fetchList']),
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    computed:{
        ...mapState('H',['list','type'])
    },
    mounted(){
        this.$store.dispatch('H/fetchList')
        // this.fetchList()
    },
}
</script>

<style lang="scss">

</style>