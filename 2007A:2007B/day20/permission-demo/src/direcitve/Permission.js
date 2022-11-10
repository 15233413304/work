export default{
    inserted(el,binding){
        // console.log(el,binding)
        if(binding.value != 'admin'){
            // 如果当前登陆用户不是管理员 删除 删除按钮 和 编辑按钮 不让其看到 保留查看按钮
            let content = el.querySelector('span').innerHTML
            if(content ==  '编辑' || content == '删除'){
                el.parentNode && el.parentNode.removeChild(el)
            }
            
        }
    }
}