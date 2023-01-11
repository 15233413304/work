<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    >
    <template #default v-if="!addressList.length">
      <van-empty description="暂无地址" />
    </template>
    </van-address-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
    // list(){
    //   return this.$store.state.addressList
    // },
    ...mapState(['addressList'])
  },
  data(){
    return {
      chosenAddressId: '1',
    }
  },
  created(){
    this.chosenAddressId = this.addressList[0]?.id || '1'
  },
  methods: {
    onAdd() {
      // Toast('新增地址');
      this.$router.push('/address/config')
    },
    onEdit(item) {
      // Toast('编辑地址:' + index);

      // this.$router.push({
      //   path:'/address/config',
      //   query: item.id
      // })

      this.$router.push(`/address/config?id=${item.id}`)

    },
  },
}
</script>

<style lang="stylus">
.van-address-list__bottom 
  bottom 50px
</style>