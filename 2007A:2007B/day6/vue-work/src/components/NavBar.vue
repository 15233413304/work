<template>
      <div class="nav">
        <span v-for="(item,index) in navList" 
          :key="index" 
          :class="{'nav-active': index === current}"
          @click="$emit('changeNav',index)">
          {{item}}
        </span>
      </div>
</template>

<script>
export default {
  props:['navList','current'],
}
</script>

<style lang="scss">
  .nav{
    span{
      margin: 10px;
    }
    .nav-active{
      color: lime;
      border-bottom: 1px solid lime;
    }
  }
</style>