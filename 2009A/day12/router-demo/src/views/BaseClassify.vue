<template>
  <div class="classify">
    <tree-select 
      :items="type"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
    >
      <template #content>
        <grid :border="false" :column-num="2">
          <!-- 通过v-for循环 渲染列表 key 是一个标识符 可以提高循环效率 能保证每一项都是独一无二 -->
          <grid-item v-for="item in classData[activeIndex]" :key="item.id">
            <van-image :src="item.img" lazy-load/>
            <p class="name">{{ item.name }}</p>
            <p>{{ item.price }}</p>
          </grid-item>
        </grid>
      </template>
    
    </tree-select>

  </div>
</template>

<script>
import { TreeSelect, Grid,GridItem, Image} from 'vant'
export default {
  components:{
    TreeSelect,
    Grid,
    GridItem,
    'van-image':Image,
  },
  data(){
    return{
      type:[{text:'分类1'},{text:'分类2'},{text:'分类3'},{text:'分类4'},{text:'分类5'},{text:'分类6'},{text:'分类7'},],
      classData:{},
      activeId:1,
      activeIndex:0,
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.$http.get('/api/class').then(res=>{
        this.classData = res
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.classify{
  height: 100%;
  .van-tree-select{
    height: 100%!important
  }
  .name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 50px;
  }
}

</style>