<template>
  <div id="app">
    <!-- 为视图组件提供的出口 这个router-view写在哪 视图组件展示的内容就在哪 -->
    <router-view />
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
