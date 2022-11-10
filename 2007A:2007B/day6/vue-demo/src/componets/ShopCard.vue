<template>
    <div>
        <div v-for="item in goods" :key="item.id">
        <h3>商品名：{{item.title}}</h3>
        <p>价格：{{item.price}}</p>
        <img :src="item.img" alt="">
        <p>
            <button @click="clickAdd(item.id)">+</button>
            数量：{{item.count}}
            <button @click="clickSub(item.id)">-</button>
        </p>
        </div>
    </div>
</template>

<script>

export default {
    // vue对组件提供的一个方法 可以接受传过来的值
    // 父组件传子组件 通过props 接受参数
    props:{
        goods:{
            // 类型
            type: Array,
            // 默认值
            default(){
                return []
            }
        }
    },
    // props:['goods'],
    methods:{
        clickAdd(id){
            // 子组件通知父组件执行一个自定义事件
            // 第一个参数是自定义事件名 用""引号包裹（你想起什么就起什么）
            // 第二个参数（可选）传过去的数据
            this.$emit('add',id)
        },
        clickSub(id){
            this.$emit('sub',id)
        }
    }
}
</script>

<style>

</style>