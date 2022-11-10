<template>
  <div class="detail">
    <div class="banner">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" @change="(index)=> current = index">
        <van-swipe-item v-for="(image, index) in detailData.detailImg" :key="index">
            <img v-lazy="image" />
        </van-swipe-item>
        <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{detailData.detailImg?.length}}</div>
        </template>
        </van-swipe>
        <!-- 返回按钮 -->
        <van-icon name="arrow-left" @click="$router.back()"/>
    </div>
    <div class="content">
        <div class="content-header">
            <h4>商品名：{{detailData.name}}</h4>
            <p>价格：{{detailData.price}}</p>
            <s>原价：{{detailData.price*10}}</s>
        </div>
        <div class="content-talk">
            <h4>用户评论</h4>
            <div class="pinglun">
                <p v-if="!detailData.pinglun?.length">
                ————  暂无评论  ————
                </p>
                <div v-for="(item,index) in detailData.pinglun" :key="index">
                    {{item}}  <van-button @click="delPinglun(index)">删除</van-button>
                </div>
            </div>
            <van-field
                v-model="userTalk"
                rows="2"
                autosize
                label="评论"
                type="textarea"
                maxlength="50"
                placeholder="请输入评论内容,最多输入50字"
                show-word-limit
                >
                <template #button>
                    <van-button size="small" type="primary" @click="handleTalk">提交</van-button>
                </template>
            </van-field>
        </div>
    </div>
    <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" 
            :badge="$store.getters.shopCount"
            @click="$router.push('/shop')"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="goShopping"/>
        <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import axios from '@/axios/axios'
import { Toast } from 'vant'
export default {
    data(){
        return{
            detailData:{},
            current: 0,
            // 用户评论
            userTalk:''
        }
    },
    created(){
        // $route 是获取路由参数用的
        // console.log(this.$route)
        // {
        //     id: this.$route.params.id,
        //     tab: this.$route.params.tab
        // }
        axios.get('/api/detail',{params:this.$route.params}).then(res=>{
            // console.log(res)
            this.detailData = res
        })
        // console.log(this.$store.state.curTab)
    },
    mounted(){

    },
    methods:{
        goShopping(){
            let { price,img,name,id } = this.detailData
            // 通知setCarList 将商品存放到vuex里的 carList中
            this.$store.commit('setCarList',{ price,img,name,id,count:1,isCheck:false })
        },
        // 提交评论
        handleTalk(){
            if(!localStorage.getItem('logined')){
                localStorage.setItem('backRouter',this.$route.fullPath)
                this.$router.push('/login')
            }
            let { id,tab } = this.$route.params
            // 提交评论
            if(!this.userTalk){
                return Toast('请输入评论内容')
            }
            axios.get('/api/talk',{params: {tab,id,talk: this.userTalk}}).then(res=>{
                this.detailData = res
            })
            this.userTalk = ''
        },
        // 删除评论
        delPinglun(index){
            let { id,tab } = this.$route.params
            // 删除
            axios.get('/api/deltalk',{params: {tab,id,talk: this.userTalk,index}}).then(res=>{
                this.detailData = res
            })
        }
    }
}
</script>

<style lang="scss">
.detail{
    height: calc(100vh - 50px);
    // 转换为弹性盒
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 改变轴向
    flex-direction: column;
  .banner{
    position: relative;
    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
     }
     .van-icon{
        position: absolute;
        top: 5px;
        left: 5px;
        padding: 5px;
        border-radius: 50%;
        background: rgba(0,0,0,.4);
        color: white;
     }
  }
  .content{
    flex: 1;
    // 转换为弹性盒
    display: flex;
    // 两端对齐
    justify-content: space-between;
    // 改变轴向
    flex-direction: column;
    // .content-header
    &-header{
        p{
            color: red;
        }
        s{
            color: #ccc;
        }
        // 怪异盒模型
        box-sizing: border-box;
        // 向内填充
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
    &-talk{
        border: 1px solid #ccc;
        border-radius: 10px;
        flex: 1;
        // 转换为弹性盒
        display: flex;
        // 两端对齐
        justify-content: space-between;
        // 改变轴向
        flex-direction: column;
        .pinglun{
            text-align: center;
            flex: 1;
            overflow: auto;
            margin-bottom: 50px;
        }
        .van-field{
            height: 120px;
            width: 99%;
            margin-bottom: 50px;
        }
    }
  }
}   
 
  
</style>