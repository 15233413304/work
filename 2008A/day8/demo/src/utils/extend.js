// 引入Vue
import Vue from 'vue'
// 引入 需要动态创建的组件
import FormToast from '@/components/FormToast.vue'
// 声明一个构造器来编辑组件的实例
const ToastConstructor = Vue.extend(FormToast)
// 封装一个函数 用来调用组件 函数接收两个参数 第一个参数是现实什么文案 第二个参数是显示多少毫秒后销毁组件
function showToast(title, timeout = 1000) {
    // 实例化构造器
    let dom = new ToastConstructor({
        // 通过document在浏览器中 创建一个元素用于存放动态创建的组件内容
        el: document.createElement('div'),
        data() {
            return {
                title,
                show: true,
            }
        }
    })
    // 在浏览器中追加 这个组件 
    document.body.appendChild(dom.$el)
    // 使用定时器 给一个延迟时间 弹窗显示的时间
    setTimeout(() => { dom.show = false }, timeout);
}
// 挂载函数
function mountFn() {
    // 挂载到vue全局中  this.$toast('你要显示的文字',显示多少毫秒) 就可以使用动态组件
    Vue.prototype.$myToast = showToast
}

export default mountFn