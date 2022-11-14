<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>
<script>
  export default{
    mounted() {

    },
  }

</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
