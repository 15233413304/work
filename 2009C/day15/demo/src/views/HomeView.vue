<template>
  <div>
    <!-- tab切换组件 -->
    <van-tabs v-model="active" @change="getHomeList()">
      <!-- tab切换的头部标题 -->
      <van-tab 
        v-for="(item,index) in navList"
        :key="index"
        :title="item"
      >
      <!-- tab切换的内容 -->
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="item in list" :key="item.id" @click="handleToDetail(item.id)">
            <van-image :src="item.img" />
            <p>{{ item.name }}</p>
            <p>{{ item.price }}</p>
          </van-grid-item>
        </van-grid>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  computed:{
    list(){
      return this.$store.state.homeList
    }
  },
  data() {
    return {
      active: 0,
      navList:['美食','数码','生活','服装']
    };
  },
  created(){
    this.getHomeList()
  },
  methods:{
    getHomeList(){
      // 调用vuex actions的getList
      this.$store.dispatch('getList',this.active)
    },
    handleToDetail(id){
      // this.$router.push(`/detail/${this.active}/${id}`)

      this.$router.push({
        name:'detail',
        params:{
          id,
          tab: this.active
        }
      })

    }
  }
}
</script>

<style>

</style>