<template>
  <div class="user">
    <admin-table
      v-if="list.length"
      :dataList="list"
      :total="total"
      :per="per"
      @changeSize="handleSize"
      @changePage="handlePage"
    />
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable.vue";
export default {
  components: {
    AdminTable,
  },
  mounted() {
    // 调用vuex store actions里的异步函数
    this.$store.dispatch("getUserList", { page: 1, pageSize: 10 });
  },
  methods: {
    handleSize({ page, pageSize }) {
      this.$store.dispatch("getUserList", { page, pageSize });
    },
    handlePage({ page, pageSize }){
      this.$store.dispatch("getUserList", { page, pageSize });
    }
  },
  computed: {
    list() {
      return this.$store.state.userList;
    },
    total() {
      return this.$store.state.total;
    },
    per(){
      return sessionStorage.getItem('token')
    },
  },
};
</script>

<style lang="scss">
.user {
  height: 100vh;
  display: flex;
}
</style>