<template>
  <div>
    <p v-for="item in code" :key="item">{{item}}</p>
  </div>
</template>

<script>
export default {
    data(){
        return{
            code: 6
        }
    }
}
</script>

<style>

</style>