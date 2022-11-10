<template>
    <van-grid :border="false" :column-num="2">
        <van-grid-item 
            v-for="item in tabList" 
            :key="item.id"
            @click="toDetail(item.id)"
            >
            <van-image :src="item.img" >
                    <template v-slot:error>加载失败</template>
            </van-image>
            <p>商品名：{{item.name}}</p>
            <p>价格：{{item.price}}</p>
        </van-grid-item>
    </van-grid>
</template>

<script>
export default {
    // 接收父组件传过来的值
    props:{
        tabList:{
            // 类型校验
            type: Array,
            // 设置默认值 父组件如果没传过来值 那就采用默认值
            default(){
                return []
            },
            // 是否必传 默认false
            // required: true
        }
    },
    methods:{
        toDetail(id){
            // 子传父 第一个参数是通知一个事件名，第二个传过去的数据
            this.$emit('toDetail',id)
        }
    }
}
</script>

<style>

</style>