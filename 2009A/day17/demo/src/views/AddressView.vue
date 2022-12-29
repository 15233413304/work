<template>
  <div>
    <van-address-list
      v-if="list.length"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <van-address-list v-else @add="onAdd">
      <template #default>
        <van-empty description="暂无收获地址" />
      </template>
    </van-address-list>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      chosenAddressId: '1',
      
    };
  },
  computed:{
    // 不分模块的时候 ...mapState(['vuex中state中的数据名'])
    // 分模块的时候 ...mapState('模块名',['vuex模块下state中的数据名'])
    //使用辅助函数
    ...mapState('address',['list']),
    // 等价于
    // list(){
    //   return this.$store.state.address.list
    // }
  },
  methods: {
    onAdd() {
      Toast('新增地址');
      this.$router.push('/create/address')
      
    },
    onEdit(item) {
      Toast('编辑地址')
      this.$router.push(`/create/address?id=${item.id}`)
    },
  },
}
</script>

<style lang="stylus">
.van-address-list__bottom
  bottom  50px
</style>