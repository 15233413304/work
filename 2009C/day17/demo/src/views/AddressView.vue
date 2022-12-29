<template>
  <div v-if="list.length">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
  <van-address-list
      v-else
      @add="onAdd"
    >
      <template #default>
        <van-empty
          class="custom-image"
          description="暂无收货地址"
          />
      </template>
  </van-address-list>
 
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex';
export default {
  computed:{
    // vuex分模块时 ...mapState('模块名',['模块下state里的数据名'])
    ...mapState('address',['list']),
    // 等价于
    // list(){
    //   return this.$store.state.address.list
    // }
  },
  data() {
    return {
      chosenAddressId: '1',
    };
  },
  created(){
    this.chosenAddressId = this.list[0]?.id
  },
  methods: {
    onAdd() {
      Toast('新增地址');
      this.$router.push('/create/address')
    },
    onEdit(item) {
      // console.log(item)
      Toast('编辑地址');
      this.$router.push(`/create/address?id=${item.id}`)
    },
  },
}
</script>

<style lang="stylus">
.van-address-list__bottom
  bottom 50px
</style>