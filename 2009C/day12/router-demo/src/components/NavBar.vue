<template>
  <van-nav-bar
    :title="title"
    :left-text="hasLeft? leftText :''"
    :right-text="hasRight? rightText: ''"
    :left-arrow="showArrow"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />

</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:()=>''
    },
    hasLeft:{
      type: Boolean,
      default: ()=> false
    },
    hasRight:{
      type: Boolean,
      default: ()=> false
    },
    showArrow:{
      type: Boolean,
      default: ()=> false
    },
    leftText:{
      type: String,
      default: ()=> '返回'
    },
    rightText:{
      type: String,
      default: ()=> '按钮'
    },

  },
  methods: {
    onClickLeft() {
      this.$emit('click-left')
    },
    onClickRight() {
      this.$emit('click-right')
    },
  },
};
</script>

<style>

</style>