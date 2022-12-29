<template>
  <div>
    <van-nav-bar 
     :title="$route.meta.title" 
     left-arrow 
     left-text="返回"
     @click-left="$router.back()"/>
     <van-empty image="search" description="页面找不到" />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>