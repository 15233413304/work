<template>
  <div>
    <nav-bar :navName="'购物'" :hasBack="true" @back="$router.go(-1)"></nav-bar>
    <van-card
      v-for="item in list" 
      :key="item.id"
      :num="item.num"
      :price="item.price"
      desc="描述信息"
      :title="item.title"
      :thumb="item.img"
    >
      <template #footer>
        <van-button size="mini" @click="cut(item.id)">-</van-button>
        <van-button size="mini" @click="add(item.id)">+</van-button>
        <van-button size="mini">删除</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapState } from 'vuex';
export default {
  components:{
    NavBar
  },
  computed:{
    ...mapState('shop',['list'])
    // list(){
    //   return this.$store.state.shop.list
    // }
  },
  methods:{
    add(id){
      this.$store.commit('shop/addShopNum',id)
    },
    cut(id){
      this.$store.commit('shop/cutShopNum',id)
    }
  }
}
</script>

<style>

</style>