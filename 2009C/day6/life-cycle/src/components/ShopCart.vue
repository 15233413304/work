<template>
  <div>
    <table width="800" class="shop" v-if="ShopList.length">
        <tr>
            <th>
                <label>全选：</label>
                <input type="checkbox" v-model="isCheckAll" @change="handleChangeAll">
            </th>
            <th>商品图片</th>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>商品数量</th> 
            <th>操作</th>
        </tr>
        <tr v-for="(item,index) in ShopList" :key="item.id" align="center">
            <td>
                <input type="checkbox" v-model="item.isCheck" @change="handleItem">
            </td>
            <td>
                <img :src="item.img" alt="">
            </td>
            <td>
                {{item.name}}
            </td>
            <td>
                {{item.price}}¥
            </td>
            <td>
               <button @click="$emit('cur',index)">-</button>
               {{item.count}}
               <button @click="$emit('add',index)">+</button>
            </td>
            <td>
              <button @click="$emit('del',index)">删除</button>
            </td>
        </tr>
        <tr align="center">
            <td>总价： </td>
            <!-- 独占5列 -->
            <td colspan="5">{{allPrice}}</td>
        </tr>
    </table>
    <div v-else>
      ——————————       暂无商品        ——————————
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        // 是否全选
        isCheckAll:false,
    }
  },
  //通过props接收传过来的数据 props接收的值不要直接改变 只做接收的操作
  props:{
    // 这里的名字需要和父组件中自定义属性对应上
    // 父组件如果是通过 xxx-xxx传过来的 可以使用大驼峰写法接收
    ShopList:{
        // 类型校验
        type: Array,
        // 设置为必传属性
        required:true
    }
  },
  // 计算属性
  computed:{
    // 计算总价 返回一个 allPrice的变量
    allPrice(){
      // 首先 需要筛选出 选中☑️的商品
      let checkList = this.ShopList.filter(item => item.isCheck)
      // 计算选中商品的总价  总价 = 所有 (商品的单价 * 商品的数量) 之和
      return checkList.reduce((prev,next)=>{
        return prev + next.price * next.count
      },0) + '¥'
    }
  },
  // 生命周期：组件从创建到销毁的过程就是生命周期
  // 实例创建前的生命周期钩子函数 vue实例此时还没创建
  // this.xxx 都是不可用的 new Vue() 之前
  beforeCreate(){
    console.log('Shop_beforeCreate')
  },
  // new Vue()之后
  // 实例创建后 此时组件中的 属性都可用了
  created(){
    console.log('Shop_created')
  },
  // 页面挂载前， 渲染之前 此时准备渲染子组件
  beforeMount(){
    console.log('Shop_beforeMount')
  },
  // beforeMount => mounted 这个过程中 会渲染子组件
  // 页面挂载后， 完成渲染了 不保证所有子组件都完成渲染
  mounted(){
    console.log('Shop_mounted')
  },
  // 页面更新前 只有数据改变时才会执行
  // 此时数据改变了 但页面还没有重新渲染
  beforeUpdate(){
    console.log('Shop_beforeUpdate')
  },
  // 页面更新后 只有数据改变并且页面完成重新渲染才会执行
  // 此时数据和页面都改变了
  updated(){
    console.log('Shop_updated')
  },
  // 组件销毁前 只有组件销毁时才会触发
  beforeDestroy(){
    console.log("Shop_beforeDestroy")
  },
  // 组件销毁后 只有组件销毁时才会触发
  destroyed(){
    console.log("Shop_destroyed")
  },
  methods:{
    // 点击全选
    handleChangeAll(){
        // 子传父 子组件通知父组件执行一个自定义事件
        // this.$emit('自定义事件名',可选参数传过去的值)
        this.$emit('checkAll',this.isCheckAll)
    },
    // 点击单选
    handleItem(){
      //商品要每一项都选中 全选才是选中 否则不选中
      this.isCheckAll = this.ShopList.every(item=> item.isCheck)
    }
  }
}
</script>

<style lang="scss" scoped>
.shop{
  // 将表格的两条边框合并为一条
  border-collapse: collapse;
  border: none;
  td,th{
    border: 1px solid;
  }
}
</style>