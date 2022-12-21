const Permission = {
    // 自定义指令的生命周期
    // 这个生命周期 只调用一次 指令第一次绑定元素的时候执行 这个生命周期中拿不到父元素
    bind(el,bingding){
        // console.log(el,bingding)
        // console.log(el.parentNode)
    },
    // 这个生命周期会在绑定的元素 插入到父元素时执行 这个生命周期中可以拿到父元素
    inserted(el,bingding){
        // console.log(el.parentNode)
        //判断有没有权限 0 普通用户 1管理员
        if(!bingding.value){
            // 普通用户 不显示删除和编辑
            // ?. es6中的语法 链式调用 当 ?.左侧的值是 null 或者 undefined时 不会再继续执行
            el?.parentNode.removeChild(el)
        }
    },
    // 绑定的元素所在的模块更新时调用
    update(){

    },
    // 绑定的雨啊怒 所在的模块更新后调用
    componentUpdate(){

    },
    // 只调用一次的生命周期 指令解绑时调用
    unbind(){

    }
}
export default Permission