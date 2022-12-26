<template>
  <div>
    <!-- tab切换 -->
    <van-tabs v-model="active" @change="changeTab">
        <!-- tab切换的头部标题 -->
        <van-tab v-for="item in navList" :key="item" :title="item">
            <!-- tab切换的内容 使用宫格布局 -->
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="item in list" :key="item.id" @click="handleToDetail(item.id)">
                    <van-image :src="item.img" />
                    <p>{{ item.name }}</p>
                    <p>{{ item.price }}</p>
                </van-grid-item>
            </van-grid>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return {
            navList:['日常','美食','数码','大众'],
            active: 0,
        }
    },
    computed:{
        list(){
            return this.$store.state.homeList
        }
    },
    created(){
        this.getList()
    },
    methods: {
        getList(){
            // 要通知 vuex中 actions里的函数 使用dispatch
            this.$store.dispatch('getList',this.active)
        },
        changeTab(){
            this.getList()
        },
        // 跳转详情
        handleToDetail(id){
            // this.$router.push(`/detail/${this.active}/${id}`)

            this.$router.push({
                name:'detail',
                params:{
                    id,
                    tab:this.active
                }
            })

        }
    },
}
</script>

<style>

</style>