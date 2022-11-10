<template>
  <div>
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

<style>

</style>