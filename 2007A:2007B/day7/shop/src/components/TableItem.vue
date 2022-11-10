<template>
  <tr>
    <!-- 21.渲染每一行 -->
        <!-- 22.第一列单选 -->
        <td>
            <!-- 29 选中某一项 -->
            <input type="checkbox" @change="checkItem(Item.id)" :checked="isCheck">
        </td>
        <!-- 23.商品名称 -->
        <td>
            {{Item.name}}
        </td>
        <!-- 24.价格 -->
        <td>
            {{Item.price}}
        </td>
        <!-- 25.数量 -->
        <td>
            <!-- 38. 添加和减少数量的按钮 -->
            <button @click="sub(Item.id)">-</button>
            {{Item.count}}
            <button @click="add(Item.id)">+</button>
        </td>
        <!-- 26.总价 -->
        <td>
            {{itemPrice}}
        </td>
        <!-- 27.操作 -->
        <td>
            <!-- 43. 点击删除按钮 -->
            <button @click="del(Item.id)">
                删除
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    // 20.接受表格组件传过来的数据
    // props:{
    //     // 每一行的数据
    //     Item:{
    //         type: Object,
    //         default(){
    //             return []
    //         }
    //     },
    //     // 这一行是否选中
    //     isCheck:{
    //         type:Boolean
    //     }
    // },
    props:['Item','isCheck'],
    computed:{
        itemPrice(){
            return this.Item.price * this.Item.count
        }
    },
    methods:{
        // 点击每一项的选中状态时触法的函数
        checkItem(id){
            // 30 将选中的商品id传过去 使用$emit('自定义事件名',传过去的数据) 通知父组件改变选中状态
            this.$emit('check', id)
        },
        // 数量减少时 触发的函数
        sub(id){
            // 39.点击减少按钮时 使用$emit('自定义事件名',传过去的数据) 通知父组件将当前项的数量减少
            this.$emit('itemSub',id)
        },
        // 数量增加时 触发的函数
        add(id){
            // 40.点击增加按钮时 使用$emit('自定义事件名',传过去的数据) 通知父组件将当前项的数量增加
            this.$emit('itemAdd',id)
        },
        del(id){
            // 44.点击删除按钮时 使用$emit('自定义事件名',传过去的数据) 通知父组件将当前项删除
            this.$emit('itemDel',id)
        }
    },
}
</script>

<style>
    td{
        text-align: center;
    }
</style>