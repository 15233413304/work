<template>
  <div class="form">
    <div class="form-item">
        <label>{{topLabel}}</label><input type="text">
    </div>
    <div class="form-item">
        <label>{{bottomLabel}}</label><input type="text">
    </div>
  </div>
</template>

<script>
export default {
    name:"AForm",
    props:{
        topLabel:{
            type:String,
        },
        bottomLabel:{
            type:String,
        }
    }
}
</script>

<style>

</style>