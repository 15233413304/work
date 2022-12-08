<template>
  <!-- 使用layout布局 -->
  <el-container style="height: 500px; border: 1px solid #eee">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <menu-layout/>
    </el-aside>
    <!-- 主体 主要内容 -->
    <el-container>
      <!-- 主体的头部 -->
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <el-popconfirm
            title="确定退出登陆吗？"
            @confirm="handleLogout">
          <el-button slot="reference" size="mini">登出</el-button>
        </el-popconfirm>
        </el-dropdown>
        <!-- 展示当前登陆的用户 -->
        <span style="marginLeft: 20px">欢迎回来，{{$store.state.username}}</span>
        
      </el-header>
      <!-- 主体中的内容 -->
      <el-main>
        <!-- 路由的出口  Index 的子路由 在这里展示 -->
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuLayout from '@/components/MenuLayout.vue';
export default {
  components:{
    MenuLayout,
  },
  methods:{
    handleLogout(){
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
};
</script>

<style>
    .el-container{
      height: 90vh;
    }
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
    
    .el-aside {
      color: #333;
      height: 90vh;
    }
  </style>