<template>
    <div id="style">
      <div class="container">
        <div class="header">
          hello
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  
  
  export default {
    
  };
  </script>
  <!-- vue中style的属性 lang 使用什么语言(css预处理器的类型 scss、less、stylus) -->
  <!-- scoped属性：可以防止和其他组件元素的类名或id一样导致样式冲突 -->
  <!-- 使用scoped有时可能会给的样式不生效 说明其他组件里有同名的元素类名或id -->
  <!-- 如果不生效这么处理？ 在原生style中 和 stylus中 可以使用 >>> 深度渲染 
    深度渲染可以保证对当前组件样式透穿（样式生效） 并保留scoped的保护性（防止和其他组件同名污染）
    在除原生style中的所有 预处理器中 都可以使用 :deep() （已废弃的写法 /deep/）
  -->
  
  <style lang="scss" scoped>
  // #style{
  //   width: 100%;
  //   height: 100%;
  //   .container{
  //     width: 100%;
  //     height: 200px;
  //     background: #000;
  //     // scss less stylus 都支持的写法 原生style不支持
  //     :deep(.header){
  //       width: 100%;
  //       height: 200px;
  //       background: #CCC;
  //     }
  //   }
  // }
  
    // 原生style和stylus中 支持这样写
    // >>>.header{
    //   width: 100%;
    //   height: 200px;
    //   background: #CCC;
    // }
  
    
  </style>
  