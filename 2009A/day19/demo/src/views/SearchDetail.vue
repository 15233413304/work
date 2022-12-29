<template>
  <div>
    <van-nav-bar 
     :title="$route.meta.title" 
     left-arrow 
     left-text="返回"
     @click-left="$router.back()"/>
    <van-empty description="暂无符合条件的商品" v-if="!searchList.length"/>
    <div v-else>
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="item in searchList" :key="item.id" @click="$router.push(`/detail/${item.id}`)">
            <!-- 图片懒加载 -->
            <van-image :src="item.img" lazy-load round>
              <!-- 裂图处理 -->
              <template #error>
                加载失败
              </template>
            </van-image>
            <!-- 使用富文本渲染 实现高亮效果 慎用v-html 可能会引起xss注入 -->
            <!-- <h3 v-html="highPre(item.name)"></h3> -->
            <!-- 可以使用 pre标签代替v-html 这是html5新增的标签 会识别文字中的元素 -->
            <pre ref="highName"></pre>
            <p>{{ item.desc }}</p>
            <p class="price">{{ item.price }}¥</p>
          </van-grid-item>
        </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState('home',['homeList']),
        searchList(){
           return this.homeList.filter(item=> item.name.includes(this.$route.query.shop))
        }
    },
    methods:{
      highPre(value){
        let { shop } = this.$route.query
        return value.split(shop).join(`<span>${shop}</span>`)
      }
    },
    mounted(){
      let { shop } = this.$route.query
      console.log(this.$refs.highName)
      this.$refs.highName.forEach((item,index)=>{
        item.innerHTML = this.searchList[index].name.split(shop).join(`<span>${shop}</span>`)
      })
      // this.$refs.highName[0].innerHTML = this.searchList[0].name.split(shop).join(`<span>${shop}</span>`)
    }
}
</script>

<style lang="stylus">
pre
  font-size 16px
  font-weight 800
  //溢出隐藏
  overflow hidden
  //强制不换行
  white-space nowrap
  //文本溢出显示...
  text-overflow ellipsis
  max-width 150px
  span
    color red
  
</style>