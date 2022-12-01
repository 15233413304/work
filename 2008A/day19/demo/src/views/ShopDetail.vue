<template>
  <div>
    <van-nav-bar title="详情页"/>
    <div class="banner">
        <van-image :src="detailData.img" width="50%"/>
    </div>
    <div class="card">
        <h1>{{detailData.title}}</h1>
        <b>{{detailData.contnet}}</b>
        <p>{{detailData.price}}¥</p>
    </div>

    <div class="footer">
        <van-goods-action>
            <van-goods-action-icon 
                icon="cart-o" 
                text="购物车"
                :badge="shopCount"
                @click="goShop" />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
                @click="handleShop"
            />
        </van-goods-action>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
    computed:{
        detailData(){
            let list = this.$store.state.homeList.list
            let { id } = this.$route.params
            return list.find(item=> item.id == id)
        },
        shopCount(){
            return this.$store.state.shopList.reduce((prev,next)=>{
                return prev + next.count
            },0)
        }
    },
    methods:{
        // ...mapMutations(['setShop']),
        // 加入购物车
        handleShop(){
            // 如果 没有登陆 那就存一下当前的详情页 并且跳转至登录页
            if(!localStorage.token){
                localStorage.setItem('backRouter',this.$route.path)
                return this.$router.push('/login')
            }
            // this.setShop(this.detailData)
            this.$store.commit('setShop',this.detailData)
        },
        // 跳转到购物车页面
        goShop(){
            this.$router.push('/shop')
        },
    }
}
</script>

<style lang="scss" scoped>
.banner{
    width: 100%;
    text-align: center;
    background: rgba(0,0,0,.4);
}
.card{
    width: 90%;
    box-sizing: border-box;
    padding: 20px;
    margin: 10px auto;
    border-radius: 10px;
    background: #eee;
    p{
        color: red;
    }
}
</style>