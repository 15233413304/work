<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods:{
        ...mapActions('home',[getPageList])
    },
    mounted() {
        this.getPageList(1)
    },
}
</script>

<style>

</style>