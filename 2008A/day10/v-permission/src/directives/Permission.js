// 假设 0 是普通用户  1是管理员用户
export default{
    // 元素绑定上这个指令时会调用这个生命周期
    // 这个生命周期有两个参数
    // 第一个参数是绑定的dom元素
    // 第二个参数是自定义指令的内容
    // bind生命周期无法拿到父元素
    bind(el,binding){
        // console.log(el,binding)
        // console.log(el.parentNode)
    },
    // 当绑定自定义指令的元素 插入到父元素上时 会触发 inserted生命周期
    inserted(el,binding){
        // console.log(el,binding)
        // console.log(el.parentNode)
        if(!binding.value){
            el.parentNode && el.parentNode.removeChild(el)
        }

    }
}