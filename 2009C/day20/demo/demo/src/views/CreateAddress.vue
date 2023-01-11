<template>
  <div>
    <van-nav-bar 
        :title="isEdit?'编辑地址':'新增地址'"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
    <van-address-edit
        :area-list="areaList"
        :show-delete="!!isEdit"
        :address-info="defaultData"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { areaList } from '@vant/area-data';
export default {
    computed:{
        isEdit(){
            return this.$route.query.id
        },
        // 数据回显 当编辑时 展示值
        defaultData(){
            return this.$store.state.addressList.find(item=> item.id == this.$route.query?.id)
        }
    },
    data(){
        return {
            areaList,
            searchResult: [],
        }
    },
    methods:{
        onSave(form) {
            // Toast('save');
            console.log(form)
            this.$store.commit('setAddress',form.id?{...form}:{...form,id:uuid()})
            this.$router.back()
        },
        onDelete() {
            // Toast('delete');
            this.$store.commit('delAddress',this.$route.query.id)
            this.$router.replace('/address')
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                {
                    name: '网站工程学院',
                    address: '八维研修学院',
                },
                ];
            } else {
                this.searchResult = [];
            }
        },
    }
}
</script>

<style lang="stylus">

</style>