<template>
  <div>
    <van-empty description="暂无收货地址" v-if="!list.length" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="vip"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  data(){
    return {
      chosenAddressId: ''
    }
  },
  computed:{
    list(){
      return this.$store.state.address.addressList
    }
  },
  methods:{
    // 新增地址
    onAdd(){
      this.$router.push('/edit')
    },
    // 编辑地址
    onEdit(item){
      console.log(item)
      this.$router.push(`/edit?id=${item.id}`)
    }
  }
}
</script>

<style lang="scss">
.van-address-list__bottom{
  bottom: 50px;
}
</style>