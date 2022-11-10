import GoodMorning from '@/components/GoodMorning.vue'
import GoodAfternoon from '@/components/GoodAfternoon.vue'
import GoodNight from '@/components/GoodNight.vue'
import StudyHard from '@/components/StudyHard.vue'
import AndMakeProgress from '@/components/AndMakeProgress.vue'
import EveryDay from '@/components/EveryDay.vue'

const list = [
    GoodMorning,
    GoodAfternoon,
    GoodNight,
    StudyHard,
    AndMakeProgress,
    EveryDay
]
// SteamUI 
// WeGameUi
// SwitchUI
// TimUI
const SteamUI = {
    //接下来 会通过 Vue.use(SteamUI) 使用这个插件
    //默认会执行插件里的 install 方法
    install(Vue){
        // Vue.component('组件名',组件)
        // Vue.component('GoodMorning',GoodMorning)
        // Vue.component('GoodAfternoon',GoodAfternoon)
        // Vue.component('GoodNight',GoodNight)
        // Vue.component('StudyHard',StudyHard)
        // Vue.component('AndMakeProgress',AndMakeProgress)
        // Vue.component('EveryDay',EveryDay)
        list.forEach(item=>{
            Vue.component(item.name,item) //等价于上面注册6个组件的写法
        })
    }
}

export default SteamUI