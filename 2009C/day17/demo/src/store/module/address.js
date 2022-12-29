let address = {
    namespaced: true,
    state:{
        list: [
            // {
            //     id: '1',
            //     name: '张三',
            //     tel: '13000000000',
            //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
            //     isDefault: true,
            // },
            // {
            //     id: '2',
            //     name: '李四',
            //     tel: '1310000000',
            //     address: '浙江省杭州市拱墅区莫干山路 50 号',
            // },
        ],
    },
    getters:{},
    mutations:{
        // 新建地址
        createAddress(state,data){
            // 判断一下是否是默认地址
            if(data.isDefault){
                // 如果是默认地址 首先 先把列表中所有的isDefault 变成false
                state.list.forEach(item=>{
                    item.isDefault = false
                })
                // 将这个地址从数组的头部追加
                return state.list.unshift({...data})
            }
            // 不是默认地址是 直接添加即可
            state.list.push({...data})
        },
        // 编辑地址
        editAddress(state,data){
            let index = state.list.findIndex(item=> item.id == data.id)
            // 编辑地址 也需要判断是否为默认地址
            if(data.isDefault){
                // 如果为默认地址 首先 先把列表中所有的isDefault 变成false
                state.list.forEach(item=>{
                    item.isDefault = false
                })
                // 先删掉原来位置的地址信息
                state.list.splice(index,1)
                // 将这个地址从数组的头部追加
                state.list.unshift({...data})
                return
            }
            // 没设置为默认地址 那就直接替换
            // state.list[index] = {...data}
            state.list.splice(index,1,{...data})
        },
        // 删除地址
        delAddress(state,id){
            let index = state.list.findIndex(item=> item.id == id)
            state.list.splice(index,1)
        }

    },
    actions:{}
}
export default address