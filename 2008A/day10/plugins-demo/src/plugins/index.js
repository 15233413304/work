// 引入要批量注册的组件
import AButton from '@/components/AButton.vue'
import AForm from '@/components/AForm.vue'

// 定义一个组件列表
const comList = [
    AButton,
    AForm,
]

// 封装一个插件 功能为 批量全局注册组件
const AUI = {
    // install方法中 提供了一个全局Vue 实例
    install(Vue){
        // Vue.component 全局注册组件
        comList.forEach(item=>{
            Vue.component(item.name,item)
        })
    }
}

export default AUI