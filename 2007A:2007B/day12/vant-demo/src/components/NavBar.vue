<template>
  <van-nav-bar
    :title="tit"
    :left-text="leftText"
    :left-arrow="showLeft"
    @click-left="onClickLeft"
   />
</template>

<script>
export default {
    props:{
        // 标题
        tit:{
            type: String,
        },
        // 是否显示左侧箭头icon
        showLeft:{
            type: Boolean,
            default(){
                return false
            }
        },
        // 左侧按钮文字
        leftText:{
            type: String,
            default(){
                return ''
            }
        }
    },
    methods:{
        onClickLeft(){
            // 反回上一级
            // this.$router.back()
            // this.$router.go(-1)
            this.$emit('back')
        }
    }
}
</script>

<style>

</style>