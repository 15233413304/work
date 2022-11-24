<template>
  <van-nav-bar
        :title="title"
        :left-text="leftText"
        :right-text="rightText"
        :left-arrow="showLeft"
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />


</template>

<script>

export default {
  props:{
    title:{
        type: String
    },
    showLeft:{
        type: Boolean,
        default:()=> false
    },
    leftText:{
        type: String,
        default:()=> ''
    },
    rightText:{
        type: String,
        default:()=> ''
    }
  },
  methods: {
    onClickLeft() {

    },
    onClickRight() {

    },
  },
};
</script>

<style>

</style>