<template>

</template>

<script>
export default {
    // 接受父组件传过来的值 相当于父组件的 showToast属性
    props:['show'],
    methods:{
        success(){
            this.$message({
                message: '添加成功',
                type: 'success'
            });
            this.$emit('successed')
        }
    },
    // 监听 父组件传过来的show 如果变成true 调用 success函数
    watch:{
        // 监听属性名 直接写在这里 会有一个回调函数 函数里接受两个参数 第一个是现在的值 第二个是旧的值
        show(value){
            if(value){
                this.success()
            }
        }
    }
}
</script>

<style>

</style>