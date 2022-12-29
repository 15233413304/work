<template>
  <div>
    <van-nav-bar 
      :title="editId?'编辑地址':'新增地址'" 
      left-text="返回" left-arrow
      @click-left="$router.back()"
    />
    <van-address-edit
      :address-info="defaultData"
      :area-list="areaList"
      :show-delete="!!editId"
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
import { Toast } from "vant";
import { areaList } from '@vant/area-data'
import { v4 as uuid } from 'uuid'
import { mapMutations } from "vuex";
export default {
  computed: {
    editId() {
      return this.$route.query?.id;
    },
    defaultData(){
      return this.$store.state.address.list.find(item=> item.id == this.$route.query.id)
    }
  },
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    // 使用mapMutations辅助函数  一定要放在methods中
    // ...mapMutations(['vuex中mutations里的函数名'])
    // ...mapMutations('模块名',['vuex中对应模块下mutations里的函数名'])
    ...mapMutations('address',['editAddress','createAddress','delAddress']),
    onSave(data) {
      Toast("save");
      // 表单输入的内容
      console.log(data)
      let newData = {...data}
      if(data.province == data.city){
        // 如果省和市重名 只显示一个名
        newData.address = `${data.province} ${data.county} ${data.addressDetail}`
      }else{
        newData.address = `${data.province} ${data.city} ${data.county} ${data.addressDetail}`
      }
      if(this.editId){
        // 编辑
        // this.$store.commit('address/editAddress',newData)
        this.editAddress(newData)
        this.$router.back()
        return
      }
      //新增
      newData.id = uuid()
      // this.$store.commit('address/createAddress',newData)
      this.createAddress(newData)
      this.$router.back()
    },
    onDelete(item) {
      Toast("delete");
      // console.log(item.id)
      this.delAddress(item.id)
      this.$router.back()
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "八维研修学院",
            address: "北京市海淀区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style>
</style>