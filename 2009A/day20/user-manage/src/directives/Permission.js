let Permission = {
    inserted(el,binding){
        if(binding.value == 0){
            el?.parentNode.removeChild(el)
        }
    }
}
export default Permission;