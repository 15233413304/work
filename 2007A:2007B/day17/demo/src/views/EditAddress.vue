<template>
  <van-address-edit
        :area-list="areaList"
        :address-info="areaData"
        show-postal
        :show-delete="!!areaId"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    />
</template>

<script>
import { areaList } from '@vant/area-data';
import { Toast } from 'vant';
export default {
    computed:{
        areaId(){
            return this.$route.query.id
        },
        areaData(){
            if(this.areaId){
                 // 点击编辑时 展示的默认数据
                return this.$store.state.address.areaData
            }
            // 没有id 说明是新建 默认数据就是空
            return {}
        }
    },
    created(){
        if(this.areaId){
            // 如果页面有id 说明是点击编辑跳转过来的
            this.$store.commit('address/setAreaData',this.areaId)
        }
    },
    data(){
        return{
            areaList,
            searchResult:[],
        }
    },
    methods: {
    onSave(data) {
      // console.log(data)
      if(this.areaId){
        // 编辑
        this.$store.commit('address/editList',{data,id:this.areaId})
      }else{
        //  新增
        // 调用address模块下的mutations里的 setList函数
        this.$store.commit('address/setList',data)
      }
      // 保存后跳转到地址列表页
      Toast(this.areaId?"编辑成功":"新建成功");
      this.$router.push('/address')
    },
    // 删除
    onDelete() {
      this.$store.commit('address/delArea',this.areaId)
      this.$router.push('/address')
      Toast('删除成功');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '上地七街',
            address: '八维研修学院',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
}
</script>

<style>

</style>