import axios from '@/axios/axios'
const address = {
    namespaced: true,
    //  this.$store.state.address
    state: {
        // 主页列表数据
        addressList:[],
        // 点击编辑时 展示的默认数据
        areaData:{}
        // {
        //   id: '1',
        //   name: '张三',
        //   手机号 
        //   tel: '13000000000',
        //   地址
        //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        //  是否为默认地址
        //   isDefault: true,
        // }
    },
    // 计算属性 类似于computed 
    //getters里的函数会默认接受一个参数 state
    getters: {
   
    },
    // 存放同步操作函数
    // mutations 里的函数 有两个参数 第一个参数：state，第二个参数：传过来的值
    // 在页面上 通过this.$store.commit("address/函数名",传过去的值)
    mutations: {
        // 新增地址
        setList(state,data){
            // 新建时对地址列表的这一项生成一个id
            // console.log(state,{...data,id:`${state.addressList.length}`})
            // state.addressList.push({...data,id:`${state.addressList.length}`})
            // 用户将改地址设置为默认地址
            if(data.isDefault){
                // 将列表里 所有的isDefault 属性变为false
                state.addressList.forEach(item => {
                    item.isDefault = false
                })
                return state.addressList.unshift({...data,id:`${+new Date()}`,address:data.province + data.city + data.county + data.addressDetail })
            }
            // 用户没设置为默认地址
            state.addressList.push({...data,id:`${+new Date()}`,address:data.province + data.city + data.county + data.addressDetail})
        },
        // 编辑地址
        editList(state,{data,id}){
            // 用户编辑改地址为默认地址
            if(data.isDefault){
                // 将列表里 所有的isDefault 属性变为false
                state.addressList.forEach(item => {
                    item.isDefault = false
                })
                // 筛选出 编辑那一项的下标
                let index = state.addressList.findIndex(item => item.id == id)
                // 对地址列表这个数组进行操作 从这个下标这里 删除一项
                state.addressList.splice(index, 1)
                return state.addressList.unshift({...data,address:data.province + data.city + data.county + data.addressDetail})
            }
            // 筛选出 编辑那一项的下标
            let index = state.addressList.findIndex(item => item.id == id)
            // 对地址列表这个数组进行操作 从这个下标这里 删除一项 然后添加一项新的数据
            state.addressList.splice(index, 1, {...data,address:data.province + data.city + data.county + data.addressDetail})
        },
        // 编辑地址页面的默认数据
        setAreaData(state,id){
            state.areaData = state.addressList.find(item=> item.id == id)
        },
        // 删除地址
        delArea(state,id){
            // 筛选出 删除那一项的下标
            let index = state.addressList.findIndex(item => item.id == id)
            // 对地址列表这个数组进行操作 从这个下标这里 删除一项
            state.addressList.splice(index, 1)
        }
    },
    // 存放异步操作函数
    // actions 里的函数 有两个参数 第一个参数： 上下文（store），第二个参数：传过来的值
    // 在页面上通过 this.$store.dispatch("address/函数名",传过去的值)
    actions: {

    },
}

export default address