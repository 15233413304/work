<template>
  <div>
    <!-- 根路由（0级）出口 -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
.fade-enter{
  // 透明度
  opacity: 0;
}
.fade-enter-active{
  // 动画效果 
  transition: all 1s ease;
  // 位移
  transform: translateY(50px);
}
.fade-enter-to{
  opacity: 1;
  transform: translateY(0px);
}

.fade-leave{
  opacity: 0;
}
.fede-leave-active{
  transition: all 1s ease;
}
.fade-leave-to{
  opacity: 1;
}

</style>
