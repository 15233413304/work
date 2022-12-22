<template>
  <div>
    <button @click="cur">-</button>
    <p>
      <!-- {{ $store.state.count }} -->
      {{ $store.getters.newCount }}
    </p>
    <button @click="add">+</button>
  </div>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('getCount')
  },
  methods:{
    cur(){
      // 错误写法！
      // this.$store.state.count --

      // 正确写法
      this.$store.commit('curCount', 1)
    },
    add(){
      // this.$store.state.count ++
      this.$store.commit('addCount', 1)
    }
  }
}
</script>

<style>

</style>