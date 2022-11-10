// 要用Vue.extend 我们要先引入一个vue
import Vue from 'vue'
// 引入要动态注册的组件
import FormToast from '@/components/FormToast.vue'
// 生成一个构造器
const ToastConstructor = Vue.extend(FormToast)

function showToast(title,timeout = 1000){
    let toast_dom = new ToastConstructor({
        el: document.createElement('div'),
        data(){
            return {
                title,
                show: true,
            }
        }
    })
    // 将动态组件 追加到dom上
    document.body.appendChild( toast_dom.$el )
    setTimeout(() => { toast_dom.show = false }, timeout);
}
// 挂载到全局中
function mountFn(){
    // this.$toast('添加成功',3000)
    Vue.prototype.$toast = showToast
}

export default mountFn