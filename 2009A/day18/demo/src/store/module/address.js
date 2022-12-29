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
    mutations:{
        // 新增收货地址
        createAddress(state,data){
            // 判断有没有设置为默认地址
            if(data.isDefault){
                // 如果新增的地址设置为默认地址了 将列表中其他地址都取消默认
                state.list.forEach(item=>{
                    item.isDefault = false
                })
                // 在数组的头部追加一条数据
                state.list.unshift({...data})
                return
            }
            // 没设置为默认地址直追加
            state.list.push({...data})    
        },
        editAddress(state,data){
            let index = state.list.findIndex(item=> item.id == data.id)
            // 判断有没有设置为默认地址
            if(data.isDefault){
                // 如果新增的地址设置为默认地址了 将列表中其他地址都取消默认
                state.list.forEach(item=>{
                    item.isDefault = false
                })
                // 在数组的头部追加一条数据
                state.list.splice(index,1)
                state.list.unshift({...data})
                return
            }
            // 没设置为默认地址 直接替换
            state.list.splice(index,1,{...data})
        },
        delAddress(state,id){
            let index = state.list.findIndex(item=> item.id == id)
            state.list.splice(index,1)
        }
    }
}

export default address