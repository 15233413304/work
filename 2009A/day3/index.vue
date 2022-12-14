<!-- 写页面渲染模板的 最终这里的代码会经过render函数 渲染成真实dom到页面上 -->
<template>
    <!-- 在vue2中 template里只能有一个根节点 -->
    <div>
        {{name}}
    </div>
</template>
<script>
export default{
    data(){
        return{
            name:"小明"
        }
    },
    methods:{},
    created(){},
    mounted(){},
    computed:{},
    watch:{},
}
</script>

<style>

</style>