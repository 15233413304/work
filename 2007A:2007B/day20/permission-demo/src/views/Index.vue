<template>
  <div class="container">
    <el-tabs type="border-card" :value="tab" @tab-click="ClickTab">
        <el-tab-pane v-for="item in tabs" :key="item.value" :label="item.label" :name="item.value">
            <router-view></router-view>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
    data(){
        return{
            // 所有的选项
            tabs:[
                {
                    label:'首页',
                    value:'0'
                },
                {
                    label:'配置管理',
                    value:'1'
                },
                {
                    label:'角色管理',
                    value:'2'
                }
            ],
            routeList: ['/home','/config','/role']
        }
    },
    computed:{
        //当前的tab选项
        tab(){
            return this.$store.state.tab
        }
    },
    methods:{
        // 点击tab时触发事件
        ClickTab(item){
            // tab存到vuex里 所以切换tab的时候需要改变vuex里的tab
            this.$store.commit('changeTab',item.name)
            // item 是element-ui提供的一个回调参数 这个参数里 可以拿到name属性
            // 判断当前页面的路由地址 是否为当前tab选中标签对应的路由地址
            if(this.$route.path != this.routeList[+item.name]){
                // 如果不是 那就跳过去
                this.$router.push(this.routeList[+item.name])
            }
        }
    },
}
</script>

<style lang="scss">
.container{
    height: 100%;
    .el-tabs__content{
        min-height: calc(100vh - 100px);
    }
}

</style>