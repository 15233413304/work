<template>
  <div class="container" v-if="show">
    <div class="content">
        <div class="title">
            {{title}}
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.container{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
        border-radius: 10px;
        background: rgba(0,0,0,.6);
        padding: 10px;
        text-align: center;
        color: white;
    }
}
</style>