

### 插件开发

```js
// plugins文件夹
// httpTool.js
function $axios({
  errorHandler = () => {},
  baseURL = "",
  timeout = 10000,
  headers = {},
  // response 之前的处理，调用方可全局自定义
  // 比如出错的统一处理
  beforeRes = (res) => (res),
  // 公参
  commonData = {}
} = {}) {
  const service = axios.create({
    baseURL,
    // 设置超时时间
    timeout,
    headers: { ...headers }
  });
  // 添加请求拦截器
  service.interceptors.request.use(
    config => {
      const { url, method } = config;
      if (!url) {
        const urlError = {
          errMessage: `url 不能为空`
        };
        return Promise.reject(urlError);
      }
      if (!method) {
        const methodError = {
          errMessage: `method 不能为空`
        };
        return Promise.reject(methodError);
      }
      // 添加公参
      const { data } = config;
      if (data) {
        config.data = { ...data, ...commonData };
      } else {
        config.data = { ...commonData };
      }
      if (config.method === "post" || config.method === "put") {
        // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
        config.data = JSON.stringify(config.data);
      }
      return config;
    },
    error => {
      // 请求错误处理
      return Promise.reject(error);
    }
  );
  service.interceptors.response.use(
    response => {
      const res = beforeRes(response);
      return Promise.resolve(response);
    },
    error => {
      try {
        const { response, message } = error;
        if (!response) {
          // request reject
          errorHandler({
            errMessage: message || "请求出错"
          });
        } else {
          const { errorMessage, status } = response;
          // 错误信息先走接口返回，在走默认信息
          let errMessage = errorMessage;
          let errData = {
            code: status,
            errMessage
          };
          // 统一错误处理可以放这，例如页面提示错误...
          // 请求错误时做些事
          errorHandler(errData, response);
        }
      } catch (e) {
        errorHandler({
          errMessage: e.message || "请求出错"
        });
      }
      return Promise.reject(error);
    }
  );
}
export default {
  install(Vue,options){
    Vue.prototype.$axios = $axios(options);
  }
}

```

#### 插件基础写法

```js
export default {
  install(Vue,options){
    // Vue 构造函数
  }
}
```

### 自定义指令开发

在 Vue，除了核心功能默认内置的指令 ( `v-model` 和 `v-show` )，Vue 也允许注册自定义指令。它的作用价值在于当开发人员在某些场景下需要对普通 `DOM` 元素进行操作。

```js
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

- 权限自定义指令开发**[提薪]**

```js
function checkArray(key) {
  let arr = ['1', '2', '3', '4']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}

const permission = {
  inserted: function (el, binding) {
    let permission = binding.value // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission)
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  },
}

export default permission
```

#### 指令生命周期

- `bind`: 只调用一次，指令第一次绑定到元素时调用，可以定义一个在绑定时执行一次的初始化动作。
- `inserted`: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
- `update`: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值。
- `componentUpdated`: 被绑定元素所在模板完成一次更新周期时调用。
- `unbind`: 只调用一次， 指令与元素解绑时调用。