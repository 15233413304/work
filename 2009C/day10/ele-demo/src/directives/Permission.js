const Permission = {
    // 自定义指令的生命周期
    // 当元素绑定上这个自定义指令时就会执行这个生命周期
    // 在这里是拿不到父元素的
    bind(el,binding){
        // console.log(el,binding)
        // console.log(el.parentNode) 
    },
    // 当绑定自定义指令的元素 插入到父组件中时 会执行这个生命周期
    inserted(el,binding){
        // console.log(el.parentNode)
        // console.log(binding.value)
        // 判断权限  不是0 就是管理员 0是普通用户
        if(!binding.value){
            // 当权限是普通用户时 通过父元素删除这个元素
            //  ?. 是es6语法 链式调用 如果?.前面的值是null 或 undefined 就不会再继续执行
            el?.parentNode.removeChild(el)
        }
    },
    // 绑定自定义指令的元素 所在的渲染模板更新后 执行
    update() {
        
    },
    // 所有的模板都更新后 执行
    componentUpdate(){

    },
    // 只调用一次的生命周期， 指令于元素解绑时调用
    unbind() {

    }
}
export default Permission