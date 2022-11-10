// 定义管理员状态码 1、2、3、4都是管理员
let admin = [1,2,3,4]

// 默认抛出
export default{
    // 当元素绑定自定义指令时会调用这个生命周期
    // 第一个参数就是绑定的元素
    // 第二个参数 就是自定义指令里的数据
    bind(el,binding){
        // console.log(el,'el')
        // console.log(binding.value,'binding')
        // console.log(el.parentNode)
    },
    // 当元素插入到父元素上会调用这个生命周期
    inserted(el,binding){
        // console.log(el,'el')
        // console.log(binding.value,'binding')
        // console.log(el.parentNode)
        // 判断 当前登陆用户的权限码是不是管理员
        // 可以使用includes 判断admin数组里 有没有v-permission传过来的这个值
        if(!admin.includes(binding.value)){
            // 如果没有权限 按钮不现实
            el.parentNode.removeChild(el)
        }
    }
}