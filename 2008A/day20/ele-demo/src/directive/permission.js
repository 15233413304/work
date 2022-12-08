// 假设除权限码为0以外都有权限
export default{
    // 当元素插入到父元素上会调用这个生命周期
    inserted(el,binding){
        // 判断 当前登陆用户的权限码是不是管理员
        // ∵ 0转boolean是false ∴ 可以通过这个来判断用户有没有权限
        if(!binding.value && !+localStorage.permission){
            // 如果没有权限 按钮不显示
            el.parentNode && el.parentNode.removeChild(el)
        }
    }
}