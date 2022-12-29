<template>
  <div>
    <van-nav-bar :title="editId ? '编辑地址' : '新增地址'" />
    <van-address-edit
      :address-info="editData"
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
import { v4 as uuid} from 'uuid'
import { mapMutations,mapState } from 'vuex'
import { Toast } from "vant";
import { areaList } from '@vant/area-data';
export default {
  computed: {
    ...mapState('address',['list']),
    editData(){
        return this.list.find(item=> item.id == this.editId)
    },
    editId() {
      return this.$route.query?.id;
    },
  },
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    // 分模块使用mapMutations   在methods中 添加一个 
    // ...mapMutations('模块名',模块下mutations里的函数名)
    // 使用 mapMutations之后 可以直接使用这个函数 直接传个参数即可
    ...mapMutations('address',['createAddress','editAddress','delAddress']),
    // 等价于
    // createAddress(参数){
    //     this.$store.commit('address/createAddress',参数)
    // }

    onSave(data) {
      Toast("save");
      //console.log(data)
      if(this.editId){
        // 编辑
        // console.log({...data})
        let newData = {...data,address: `${data.province} ${data.city} ${data.county} ${data.addressDetail}`}
        if(data.province == data.city){
            newData = {...data,address: `${data.city} ${data.county} ${data.addressDetail}`}
        }
        this.editAddress(newData)
        this.$router.back()
        return 
      }
      // 新增
      let newData = {...data,id:uuid(),address: `${data.province} ${data.city} ${data.county} ${data.addressDetail}`}
      if(data.province == data.city){
            newData = {...data,id:uuid(),address: `${data.city} ${data.county} ${data.addressDetail}`}
        }
      this.createAddress(newData)
      this.$router.back()
    },
    onDelete() {
      this.delAddress(this.$route.query.id)
      this.$router.back()
      Toast("delete");
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