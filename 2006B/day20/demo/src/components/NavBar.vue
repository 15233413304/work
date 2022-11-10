<template>
  <div class="nav-bar">
    <van-nav-bar
        :title="navName"
        :left-text="hasBack?'返回':''"
        :left-arrow="hasBack"
        @click-left="$emit('back')"
    />
  </div>
</template>

<script>
export default { 
    props:{
        navName:{
            type:String
        },
        hasBack:{
            type:Boolean,
            default(){
                return false
            } 
        },
    }
}
</script>

<style lang="scss" scoped>
.nav-bar{
    position: sticky;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 99999;
}
</style>