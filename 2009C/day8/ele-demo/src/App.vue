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
    };
  },
  async created() {
    this.list = await this.$http.get("/api/list");
  },
};
</script>

<style></style>
