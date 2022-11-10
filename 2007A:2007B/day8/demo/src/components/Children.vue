<template>
  <div>
    <!-- {{msg}} -->
    <!-- {{obj.message}} -->
    {{name()}}
  </div>
</template>

<script>
export default {
    // inject: ['msg']
    // inject:['obj']
    inject:['name'],
    created() {
        this.$bus.$on('sendName',(name)=>{
            console.log(name)
        })
    },
}
</script>

<style>

</style>