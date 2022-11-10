<template>
  <div>
    <nav-bar :navName="title" :hasBack="true" @back="$router.push('/address')"/>
    <van-address-edit
        :area-list="areaList"
        :address-info="info"
        show-postal
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import NavBar from '@/components/NavBar.vue'
export default {
    components:{
        NavBar
    },
    data(){
        return {
            areaList,
            info:{}
        }
    },
    computed:{
        title(){
            if(this.$route.query.id){
                return '编辑地址'
            }else{
                return '新增地址'
            }
        }
    },
    mounted(){
        if(this.$route.query.id){
            let list = this.$store.state.address.list
            // this.info = list.find(item=> item.id === this.$route.query.id)
            this.info = list.find( item => {
                return item.id === this.$route.query.id
            })
        }
    },
    methods:{
        onSave(con){
            if(this.$route.query.id){
                this.$store.commit('address/edit',con)
            }else{
                this.$store.commit('address/add',con)
            }
            this.$router.push('/address')
        },
        onDelete(con){
            this.$store.commit('address/del',con.id)
            this.$router.push('/address')
        },
    }
}
</script>

<style>

</style>