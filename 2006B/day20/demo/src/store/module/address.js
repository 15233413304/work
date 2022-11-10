const address ={
    // 命名空间 防止和其他模块命名相同导致冲突(污染)
    namespaced: true,
    state: {
      list:[],
    },
    getters: {},
    mutations: {
        add(state,content){
            // 判断是否新建为默认地址
            if(content.isDefault){
                state.list.forEach(item=>{
                    // 将其他项的id+1 使其在数组中的地位下降
                    item.id = `${+item.id + 1}`
                    // 将其他项的默认属性变成false 因为只能有一个是默认地址
                    item.isDefault = false
                })
                // 从数组头部追加一个默认收货地址的对象
                state.list.unshift({
                    ...content,
                    address: content.addressDetail,
                    id:'0'
                })
            }else{
                // 不新建为默认地址直接push
                state.list.push({...content,
                    address: content.addressDetail,
                    id:`${state.list.length}`
                })
            }
        },
        edit(state,content){
            // 我们要编辑的下标
            let index = state.list.findIndex(item => state.id === item.id)
            // 判断是否编辑为默认地址
            if(content.isDefault){
                // 先删掉原有的这个编辑项
                state.list.splice(index,1)
                // 新增到第一位
                state.list.unshift({
                    ...content,
                    address: content.addressDetail,
                })
                state.list.forEach((item,index)=>{
                    // 将数组重新排序
                    item.id = `${index}`
                    // 将数组内每一项的默认属性变成false
                    item.isDefault = false
                })
                // 将咱们编辑的这个变成默认地址
                state.list[0].isDefault = true
            }else{
                state.list[+content.id] = {...content,address: content.addressDetail,id:content.id}
            }
        },
        del(state,id){
            state.list.splice(+id,1)
            state.list.forEach((item,index)=>{
                // 将数组重新排序
                item.id = `${index}`
            })
        }
    },
    actions: {},
}

export default address