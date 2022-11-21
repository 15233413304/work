<template>
  <div>
    <van-field
        v-model="value"
        @input="change"
        center
        placeholder="请输入搜索内容"
        >
    <template #button>
        <van-button size="small" type="primary" @click="handleSearch">搜索</van-button>
    </template>
    </van-field>
  </div>
</template>

<script>
export default {
    data(){
        return{
            value:''
        }
    },
    methods:{
        handleSearch(){
            this.$emit('searchFn',this.value)
        },
        change(){
            if(this.value == ''){
                this.$emit('noSearch')
            }
        }
    }
}
</script>

<style>

</style>