<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    
  </div>
</template>

<style lang="stylus">
*
  margin 0
  padding 0
html,body,#app
  width 100vw
  height 100vh
</style>
