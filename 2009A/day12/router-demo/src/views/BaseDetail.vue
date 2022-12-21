<template>
  <div>
    <!-- {{ detailData }} -->
    <!-- 轮播图 -->
    <swipe :autoplay="3000" @change="(index)=> current = index">
      <swipe-item v-for="(i, idx) in detailData.detailImg" :key="idx">
        <img v-lazy="i" />
      </swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ detailData.detailImg?.length }}</div>
      </template>
    </swipe>
    <!-- 商品信息 -->
    <div class="info">
      <h3>{{ detailData.name }}</h3>
      <p>{{ detailData.price }}¥</p>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  components:{ Swipe, SwipeItem },
  data(){
    return{
      detailData:{},
      current: 0,
    }
  },
  // 接受路由传递的参数
  created(){
    // 接受 query 传递的参数 this.$route.query 接参这个方法 是 $route !!!  没有r
    // this.getDetail(this.$route.query.id)

    // 接受 params 传递的参数 this.$route.params
    this.getDetail(this.$route.params.id)

  },
  methods:{
    getDetail(id){
      this.$http.get('/api/detail',{params:{id}}).then(res=>{
        this.detailData = res
      })
    }
  }
}
</script>

<style lang="scss">
.van-swipe{
  background: #eee;
  &-item{
    text-align: center;
  }
}
  .custom-indicator {
    position: absolute;
    right: 38px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .info{
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin: 20px auto;
    background: #f5f5f5;
    border-radius: 10px;
    p{
      color: red;
    }
  }
</style>