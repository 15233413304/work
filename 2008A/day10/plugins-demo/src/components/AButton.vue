<template>
  <button @click="$emit('submit')">
    <slot></slot>
  </button>
</template>

<script>
export default {
    name:'AButton'
}
</script>

<style>

</style>