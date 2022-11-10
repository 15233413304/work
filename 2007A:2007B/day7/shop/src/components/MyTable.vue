<template>
  <div>
    <table border="1" width="800" cellspacing="0" cellpadding="0" bordercolor="#000">
        <!-- 15.全选框 -->
        <th>
            全选：<input type="checkbox" v-model="isCheckAll" @change="changeAll">
            <button @click="handleOther">
                <!-- 44. 添加一个反选按钮 -->
                反选
            </button>
        </th>
        <th v-for="item in navList" :key="item">
            {{item}}
        </th>
        <!-- 18.使用TableItem 组件 -->
        <!-- 19.传过去父组件传过来的数据 -->
        <!-- 31. @check="checkItem" 接受子组件传递过来的事件 子组件通知的事件是check 那这里就写@check -->
        <!-- 41. @itemSub="subItem" 接受子组件传递过来的事件  子组件通知的事件是itemSub 那这里就写@itemSub  -->
        <!-- 42. @itemAdd="addItem" 接受子组件传递过来的事件  子组件通知的事件是itemAdd 那这里就写@itemAdd  -->
        <TableItem v-for="(item,index) in list" 
        :key="index" 
        :Item="item"
        :isCheck="item.isCheck"
        @check="checkItem"
        @itemSub="subItem"
        @itemAdd="addItem"
        @itemDel="delItem"
        />
        <!-- 28 总计 -->
        <td>总计：</td><td colspan="5"> 总数：{{allCount}} 总价：{{allPricea}}  </td>
    </table>
  </div>
</template>

<script>
// 16。引入TableItem 组件
import TableItem from '@/components/TableItem.vue'
export default {
    components:{
        // 17.注册TableItem 组件
        TableItem
    },
    // 14.接受传过来的list
    props:{
        list:{
            type: Array,
            default(){
                return []
            }
        }
    },
    computed:{
        //  35. 计算总数
        allCount(){
            // 36. 将当前选中的商品 统计成一个新的数组
            let chekList = this.list.filter(item => item.isCheck)
            return chekList.reduce((pre,cur)=>{
                return pre + cur.count
            },0)
        },
        // 37. 计算总价
        allPricea(){
            let chekList = this.list.filter(item => item.isCheck)
            return chekList.reduce((pre,cur)=>{
                return pre + cur.count * cur.price
            },0)
        }
    },
    data(){
        return {
            navList: ['名称','价格','数量','总价','操作'],
            // 是否全选
            isCheckAll: false,
        }
    },
    methods:{
        // 封装一个筛选操作项的函数
        getIndex(id){
            return this.list.findIndex(item => item.id == id)
        },
        checkItem(id){
          // 32. 筛选出咱们操作的那一项
          let index = this.getIndex(id)
          //  34. 点击每一项时 判断全选状态
          this.list[index].isCheck = !this.list[index].isCheck
          // every是数组的操作方法 会循环数组的每一项 当每一项都符合条件时 返回一个true 任何一项不符合条件 就返回false
          this.isCheckAll = this.list.every(item=> item.isCheck) 
        },
        // 子组件点击减少时 父组件接受过来的自定义事件 调用的函数
        subItem(id){
            let index = this.getIndex(id)
            // 判断 数量如果大于1 才减少
            if(this.list[index].count >1){
                this.list[index].count --
            }
        },
        // 子组件点击增加时 父组件接受过来的自定义事件 调用的函数
        addItem(id){
            let index = this.getIndex(id)
            this.list[index].count ++
        },
        // 点击全选
        changeAll(){
            //33. 全选按钮状态发生改变时 将每一项的选中状态变成全选框的选中状态
            this.list.forEach(item=>{
                item.isCheck = this.isCheckAll
            })
        },
        // 点击反选
        handleOther(){
            this.list.forEach(item=> {
                item.isCheck = !item.isCheck
            })
            this.isCheckAll = this.list.every(item=> item.isCheck) 
        },
        // 子组件点击删除时 父组件接受过来的自定义事件 调用的函数
        delItem(id){
            let index = this.getIndex(id)
            // splice 是数组的操作方法 会改变原数组 
            // 第一个参数是要操作项的下标  
            // 第二个参数是从这个下标开始向后删除几位 
            // 第三个参数是我们要在这个下标后边新增什么内容
            this.list.splice(index,1)
        }
    },
}
</script>

<style>

</style>