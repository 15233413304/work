<template>
  <div class="mask">
    <div class="box">
        <div class="top">
            <!-- 默认插槽 template里写的值就会在这里显示 -->
            <!-- <slot></slot> -->
            <!-- 具名插槽/命名插槽 -->
            <!-- <slot name="rule"></slot>
            <slot name="title"></slot> -->
            <!-- 作用域插槽 -->
            <!-- <slot name="rule" :formName="form.name"></slot>
            <slot name="disc" :formDisc="form.disc"></slot> -->
            
            <slot :tit="title"></slot>

            <el-button round icon="el-icon-close" @click="close"></el-button>
        </div>
        <div>
            <!-- 规则名称 -->
            <el-input type="text" v-model="form.name" placeholder="请输入规则名称"/>
        </div>
        <div>
            <!-- 描述 -->
            <el-input type="text" v-model="form.disc" placeholder="请输入描述"/>
        </div>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                // 规则名称
                name:'',
                // 描述
                disc:''
            },
            title:"新建规则"
        }
    },
    methods:{
        // 点击关闭和取消时触发的事件
        close(){
            this.form.name = ''
            this.form.disc = ''
            this.$emit('close')
        },
        // 点击确定时触发的事件
        submit(){
            // this.$emit('submit',this.form)
            this.$emit('close')
            this.$bus.$emit('submit',this.form)
        }
    }
}
</script>

<style lang="scss">
.mask{
    width: 100%;
    height: 100%;
    // 设置一个黑色 透明度50%
    background: rgba(0,0,0,.5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999999;
    // 转换为弹性盒
    display: flex;
    // 弹性盒的子元素水平居中
    justify-content: center;
     // 弹性盒的子元素垂直居中
    align-items: center;
    .box{
        .top{
            display: flex;
            // 水平两端对齐
            justify-content: space-between;
        }
        width: 500px;
        background: #fff;
        border-radius: 10px;
        padding: 30px;
        .el-input{
            margin: 10px;
        }
    }
}
</style>