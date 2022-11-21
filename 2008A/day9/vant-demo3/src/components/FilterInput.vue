<template>
  <div>
    <van-field
      v-model="state.value"
      @input="change"
      center
      placeholder="请输入搜索内容"
    >
      <template #button>
        <van-button size="small" type="primary" @click="handleSearch"
          >搜索</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script setup>
import { reactive, defineEmits } from "@vue/reactivity";
const emit = defineEmits();
const state = reactive({
  value: "",
});

const change = () => {
  if (state.value == "") {
    emit("noSearch");
  }
};
const handleSearch = () => {
  emit("searchFn", state.value);
};
</script>

<style>
</style>