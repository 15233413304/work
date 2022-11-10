<template>
  <div class="left">
    <p v-for="(item,index) in title" :key="index">{{item}}</p>
  </div>
</template>

<script>
export default {
    props:['title']
}
</script>

<style>

</style>