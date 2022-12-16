<template>
  <div>
    <user-table :table-list="list" />
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
export default {
  components: {
    UserTable,
  },
  data() {
    return {
      list: [],
      total: 0,
    };
  },
  // 通过provide 提供一个 total函数 将total响应式的提供出去
  provide(){
    return{
      total:()=>{
        return this.total
      }
    }
  },
  created() {
    // 监听派发的page事件
    this.$bus.$on('page',({page,pageSize})=>{
      //获取接口数据 拿到列表数据和数据的总条数
      this.$http.get("/api/list",{params:{page,pageSize}}).then(res=>{
        this.list = res.list
        this.total = res.total
      })
    })
    
  },
};
</script>

<style></style>
