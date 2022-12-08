<template>
  <div>
    <!-- 使用面包屑组件 -->
    <bread-layout :breadList="bread" />
    <!-- 使用表格组件 -->
    <user-table
      :tableData="tableData"
      @add="toAddUser"
      @edit="handleEdit"
      @del="handleDel"
    />
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";

export default {
  components: {
    UserTable,
  },
  created() {
    // 获取用户列表
    this.$nextTick(() => {
      this.getList();
    });
  },
  methods: {
    // 获取用户列表
    getList() {
      this.$store.dispatch("getUserList").then(() => {
        this.tableData = this.$store.state.userList;
      });
    },
    // 跳转到 新增/编辑 页面进行新增用户
    toAddUser() {
      this.$router.push("/edit");
    },
    // 跳转到 新增/编辑 页面进行编辑用户
    handleEdit(id) {
      // 如果是编辑用户 需要传递一个id
      this.$router.push(`/edit?id=${id}`);
    },
    // 通过用户id删除用户
    handleDel(id) {
      this.$store.dispatch("delUser", id).then(()=>{
        this.getList()
      })
    },
  },
  data() {
    return {
      // 用户列表数据
      tableData: [],
      // 面包屑里的标签和对应的路由都有什么
      bread: [
        { path: "/", title: "首页" },
        { path: "/table", title: "用户列表" },
        { path: "/edit", title: "新增用户" },
      ],
    };
  },
};
</script>

<style>
</style>