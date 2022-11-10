<template>
  <div class="app">
    <div class="table">
      <el-button type="primary" icon="el-icon-plus" @click="add"
        >新建</el-button
      >
      <el-table :data="tableData">
        <el-table-column label="序号">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="服务名字"> </el-table-column>
        <el-table-column prop="disc" label="描述"> </el-table-column>
        <el-table-column prop="count" label="调用次数">
          <template #default="scope">
            <!-- 将调用次数转成xxx万 -->
            {{ Count(+scope.row.count) }}
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <!-- 通过elementui 提供的默认插槽里的 row 属性 拿到这行的数据 -->
          <template #default="scope">
            <!-- 将时间戳转成时间 -->
            {{ Timer(+scope.row.time) }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 使用组件 -->
      <Alert v-if="showAlert" @close="showAlert = false" @submit="submitAlert">
        <!-- 默认插槽 -->
        <!-- <template>
            <h4>新建规则</h4>
          </template> -->
        <!-- <template v-slot:default>
            <h4>新建规则</h4>
          </template> -->
        <!-- 具名插槽/命名插槽 -->
        <!-- <template v-slot:rule>
            <h4>新建规则</h4>
          </template>

          <template v-slot:title>
            <h3>提示</h3>
          </template> -->
        <!-- v-slot 可以缩写成# -->
        <!-- <template #rule>
            <h4>新建规则</h4>
          </template>

          <template #title>
            <h3>提示</h3>
          </template> -->

        <!-- 作用域插槽 -->
        <!-- <template #rule="def">
            {{def.formName}}
          </template>
          <template #disc="def">
            {{def.formDisc}}
          </template> -->
        <template #default="def">
          <h3>{{ def.tit }}</h3>
        </template>
      </Alert>
      <Success :show="showToast" @successed="showToast = false" />
    </div>
  </div>
</template>

<script>
// 从axios二次封装的文件中 引入axios
// @/就是 src/
import axios from "@/axios/axios";
// 引入弹窗组件
import Alert from "@/components/Alert.vue";
export default {
  components: {
    // 注册组件
    Alert,
  },
  data() {
    return {
      tableData: [],
      // 是否显示弹窗
      showAlert: false,
      // 是否弹出成功提示
      showToast: false,
    };
  },
  created() {
    // 调接口请求数据
    this.fetchList();
  },
  mounted(){
    this.$bus.$on('submit', form => {
      this.submitAlert(form)
    })
  },
  methods: {
    // 转换时间的函数
    Timer(t) {
      return `${new Date(t).getFullYear()}/${
        new Date(t).getMonth() + 1
      }/${new Date(t).getDate()}  ${new Date(t).getHours()}:${new Date(
        t
      ).getMinutes()}:${new Date(t).getSeconds()}`;
    },
    // 转换单位的函数
    Count(num) {
      if(num<10000){
        return num
      }
      // 把 num 四舍五入为指定小数位数的数字
      return (num / 10000).toFixed() + '万';
    },
    fetchList() {
      axios.get("/api/list").then((res) => {
        console.log(res);
        // 将tableData 赋值为请求过来的数据
        this.tableData = res;
      });
    },
    // 点击新建
    add() {
      this.showAlert = true;
    },
    submitAlert(form) {
      form.time = +new Date();
      form.count = 6000000;
      axios.get("/api/add", { params: { form } });
      // .then(res=>{
      //   // this.$set(this,'tableData',res)
      //   this.tableData = res
      // })
      // 重新请求列表
      this.fetchList();
      // 弹出提示
      this.$toast('添加成功')
      // this.showToast = true;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.app {
  // 给最外层盒子一个宽度
  width: 100%;
  .table {
    width: 1000px;
    margin: 40px auto;
  }
}
</style>