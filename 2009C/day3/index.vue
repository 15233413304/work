<!-- vue中的渲染模板 页面布局 排版 最终会转为render 函数执行 通过js执行render函数渲染到页面上-->
<template>
    <!-- 注意：vue2中 template里 只能有一个根节点 -->
    <div>
        {{name}}
    </div>
</template>
<script>
export default{
    data(){
        return {
            name:'小张'
        }
    },
    methods:{},
    conputed:{},
    watch:{},
    created(){},
    mounted(){},
}
</script>