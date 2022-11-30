<template>
  <div>
    <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    >
        <template #default>
            <van-empty v-if="!addressList.length" description="暂无收获地址" />
        </template>
    </van-address-list>
    
  </div>
</template>

<script>
// import { Toast } from 'vant';
// import { mapState } from 'vuex';
export default {
  data() {
    return {
      chosenAddressId: '1',
    };
  },
  computed:{
    // ...mapState(['addressList'])
    addressList(){
        return this.$store.state.addressList
    }
  },
  methods: {
    onAdd() {
        // 跳转到新增地址页面
        this.$router.push('/address/edit')
    },
    onEdit(item) {
        this.$router.push(`/address/edit?id=${item.id}`)
    },
  },
};
</script>

<style lang="scss" scoped>
.van-address-list__bottom{
    bottom: 50px;
}
</style>