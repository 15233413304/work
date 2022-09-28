// 防抖
// immediate 是否直接执行
function debounce(func,wait = 500,immediate = true) {
  let timeout;

  return function () {
      let context = this;
      let args = arguments;
      //   如果已经存在定时器，清除定时器
      if (timeout) clearTimeout(timeout);
      if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(() => {
              timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
  }
}
// 节流 节流两种方式 一种是通过日期时间戳判断减少频率，一种是通过定时器延迟来减少频率
function throttle(func, wait = 500, type = 1) {
  let previous = 0;
  let timeout;
  return function() {
      let context = this;
      let args = arguments;
      if(type === 1){
          let now = Date.now();
          if (now - previous > wait) {
              func.apply(context, args);
              previous = now;
          }
      }else if(type === 2){
          if (!timeout) {
              timeout = setTimeout(() => {
                  timeout = null;
                  func.apply(context, args)
              }, wait)
          }
      }
  }
}