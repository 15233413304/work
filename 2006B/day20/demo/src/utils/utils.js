// 防抖函数
export function debounce (fn,timeout = 1000,) {
    let _time = null
    return function () {
        let _arg = arguments
        clearTimeout(_time)
        _time = setTimeout(() => {
            fn.apply(this, _arg)
        }, timeout)
    }
}
// 节流函数
export function throttling (fn,timeout = 1000) {
    let _playing = null
    return function () {
        let _arg = arguments
        if (_playing) {
            return
        }
        _playing = true
        setTimeout(() => {
            fn.apply(this, _arg)
            _playing = false
        }, timeout)
    }
}
