<template>
  <div>
    <van-nav-bar :title="$route.query.id?'编辑地址':'新增地址'"/>
    <van-address-edit
        :area-list="areaList"
        :address-info="defaultData"
        :show-delete="!!$route.query.id"
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
import { areaList } from '@vant/area-data'
import {v4 as uuid} from 'uuid'
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  computed:{
    defaultData(){
        let {id} = this.$route.query
        if(id){
          return this.$store.state.addressList.find(item=> item.id == id)
        }
        return {}
    }
  },
  methods: {
    onSave(con) {
      let { province, city, county, addressDetail, isDefault, name, tel,areaCode} = con
      let submitData = {
        id: this.$route.query.id? this.$route.query.id: uuid(),
        name,
        tel,
        areaCode,
        province,
        city,
        county,
        addressDetail,
        address: province == city? `${city} ${county} ${addressDetail}` : `${province} ${city} ${county} ${addressDetail}`,
        isDefault,
      }
      this.$store.commit('EditAddress',submitData)
      this.$router.push('/address')
    },
    onDelete() {
      // Toast('delete');
      let {id} = this.$route.query
      this.$store.commit('DelAddress',id)
      this.$router.replace('/address')
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '网站工程学院2008A班',
            address: '八维研修学院',
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