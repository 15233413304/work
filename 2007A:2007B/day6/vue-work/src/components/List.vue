<template>
  <div class="list">
    <div v-for="(item,index) in list" :key="index">
        <h3>{{item.title}}</h3>
        <p>{{item.name}}</p>
    </div>
    </div>
</template>

<script>
export default {
    props:['list']
}
</script>

<style lang="scss">
.list{
    max-height: 500px;
    overflow: auto;
}
</style>