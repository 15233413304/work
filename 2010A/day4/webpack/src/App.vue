<!-- 写html部分代码 渲染的dom元素模板 -->
<template>
    <div id="app">
        <!-- 创建表格内容的表单 -->
        <div>
            序号
        </div>
        <div>
            姓名：<input type="text" v-model="form.name">
        </div>
        <div>
            年龄：<input type="text" v-model="form.age">
        </div>
        <div>
            性别：
            <select v-model="form.sex">
                <option value="1">男</option>
                <option value="2">女</option>
            </select>
        </div>
        <button @click="handleCreate">添加/修改</button>
        <!-- 表格 -->
        <!-- 使用 v-if="返回布尔值的逻辑" 可以控制元素的创建销毁 来实现显示隐藏 -->
        <table v-if="tableList.length">
            <!-- 列表的表头 -->
            <tr>
                <th>姓名</th>
                <th>年龄</th>
                <th>性别</th>
                <th>操作</th>
            </tr>
            <!-- 列表的内容 -->
                <tr v-for="(item,index) in tableList" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.sex ===1? '男':'女'}}</td>
                    <td>
                        <button @click="handleDelete(index)">删除</button>
                    </td>
                </tr>
            
        </table>
    </div>
</template>
<!-- 写js代码 生命周期、实例方法、数据等 -->
<script>
export default{
    // 数据、状态、变量都存放在data里 data一定要return一个对象
    data(){
            return{
                form:{
                    // 姓名
                    name:'',
                    // 年龄
                    age:'',
                    // 性别
                    sex: 1
                },
                // 表格的数据
                tableList:[]
            }
        },
        // 存放函数的
        methods: {
            // 点击 添加/修改 按钮时触发的回调函数
            handleCreate(){
                let { name, age, sex } = this.form
                // 判断有没有输入内容
                if(name.length && age.length){
                    // 如果有重名的 就返回对应下标 如果没有 返回-1
                    let index = this.tableList.findIndex(item=> item.name == name)
                    if(index == -1){
                        // 列表里没有这个名字时 直接添加
                        this.tableList.push({...this.form})
                    }else{
                        // 列表里有这个名字 修改
                        this.tableList.splice(index,1,{...this.form})
                    }
                    // 清空表单的内容
                    this.form = {
                        // 姓名
                        name:'',
                        // 年龄
                        age:'',
                        // 性别
                        sex: 1
                    }
                }
            },
            // 点击删除时触发这个函数
            handleDelete(index){
                this.tableList.splice(index,1)
            }
        },
}
</script>
<!-- 写css代码 基本和html中的style功能一致 -->
<!-- style的属性 scoped lang -->
<!-- scoped 是防止组件有重类名、重id的元素 样式互相污染 scoped可以保证样式只对当前组件生效 -->
<!-- lang css预处理器语言 例如 less、sass/scss、stylus -->
<style>

</style>