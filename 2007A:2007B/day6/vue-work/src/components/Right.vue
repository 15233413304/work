<template>
  <div class="right">
      <img v-for="(item,index) in rightImg" :key="index" :src="item" alt="">
    </div>
</template>

<script>
export default {
    props:['rightImg']
}
</script>

<style>

</style>