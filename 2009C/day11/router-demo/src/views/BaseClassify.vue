<template>
  <div class="classify">
    <van-tree-select
        :items="type"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
      >
        <template #content>
          <van-grid :border="false" :column-num="2">
            <van-grid-item v-for="item in listData[activeIndex]" :key="item.id">
              <van-image :src="item.img" lazy-load round>
                <template v-slot:error>加载失败</template>
              </van-image>
              <p class="name">{{ item.name }}</p>
              <p>{{ item.price }}</p>
            </van-grid-item>
          </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeId:1,
      activeIndex:0,
      type:[{text:'日常'},{text:'百货'},{text:'美食'},{text:'家电'},{text:'数码'},{text:'绿植'},{text:'宠物'},],
      listData:{}
    }
  },
  methods:{
    getData(){
      this.$http.get('/api/class').then(res=>{
        // console.log(res)
        this.listData = res
      })
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style lang="scss">
.classify{
  height: 100%;
  .van-tree-select{
    height: 100%!important
  }
  .name{
    // 文本强制不换行
    white-space: nowrap;
    // 溢出隐藏
    overflow: hidden;
    // 文本溢出显示...
    text-overflow: ellipsis;
    width: 100px;
    text-align: center;
  }
}
</style>