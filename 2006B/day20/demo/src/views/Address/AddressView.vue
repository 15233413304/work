<template>
  <div>
    <nav-bar :navName="'地址'" :hasBack="true" @back="$router.go(-1)"/>
    <van-address-list
        v-model="currentId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    >
        <template #default  v-if="!list.length">
            <van-empty description="暂无地址列表" />
        </template>
    </van-address-list>
    
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components:{
        NavBar
    },
    data(){
        return {
            currentId:'0'
        }
    },
    computed:{
        list(){
            return this.$store.state.address.list
        },
    },
    methods:{
        onAdd(){
            this.$router.push('/address/detail')
        },
        onEdit(item){
            this.$router.push({path:'/address/detail',query: {id:item.id}})
        }
    }
}
</script>

<style lang="scss" scoped>
.van-address-list__bottom{
    bottom: 50px;
}
</style>