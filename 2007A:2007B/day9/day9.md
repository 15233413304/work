

- v-model指令原理讲解 ****
  
  v-model就是vue的双向绑定的指令，能将页面上控件输入的值同步更新到相关绑定的data属性，也会在更新data绑定属性时候，更新页面上输入控件的值。
  
  v-model作为双向绑定指令也是vue两大核心功能之一，使用非常方便，提高前端开发效率。在view层，model层相互需要数据交互，即可使用v-model。
  
  v-model主要提供了两个功能，view层输入值影响data的属性值，data属性值发生改变会更新view层的数值变化。
  
  ``` html
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      </head>
      <body>
      <div id="app">
          <p>{{name}}</p>
          <input type="text" v-model="name" />
      </div>
      </body>
      </html>
  ```
  ``` js
  node.addEventListener("input",function(e){
      vm.name = e.target.value;
  })
  Object.defineProperty(data,"name",{
      get(){
          return data["name"];
      },
      set(newVal){ 
          let val = data["name"];
          if (val === newVal){
              return;
          }
          data["name"] = newVal;
          // 监听到了属性值的变化,假如node是其对应的input节点
          node.value = newVal;
      }    
  })
  ```
  
- v-model作用在组件上
```js
<input :value="value" @input="this.value = $event.target.value" />

<input v-model="value" />

```

```js
  // 父组件
  <template>
      <my-children v-model="title" />
  </template>
  <script>
      export default {
          data(){
              return {
                  title:'title'
              }
          }
      }
  </script>

  // 子组件
  <template>
      <div>
          <input :value="inputValue" @input="$emit('update', $event.target.value)"/>
      </div>
  </template>
  <script>
      export default {
          props:{
              value: String
          },
          model: {
              prop: "value", //绑定的值，通过父组件传递
              event: "update" //自定义时间名
          }
      }
  </script>
```

----

### 2. 内置组件

  - component组件 动态组件

```js
<component :is="组件名/组件选项"></component>
```

  - 过渡效果 transition

```js
<transition>
  <div v-if="ok">toggled content</div>
</transition>
```

  - 递归组件

组件是可以在它们自己的模板中调用自身的。不过它们只能通过`name` 选项来做这件事

### 3.keep-alive组件

##### 3.1什么是keep-alive

keep-alive 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
和 transition 相似，keep-alive 是一个抽象组件：它自身不会渲染成一个 DOM 元素，也不会出现在父组件链中。

作用： 在组件切换过程中将状态保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性。

原理： 在 created 函数调用时将需要缓存的 VNode 节点保存在 this.cache 中／在 render（页面渲染） 时，如果 VNode 的 name 符合缓存条件（可以用 include 以及 exclude 控制），则会从 this.cache 中取出之前缓存的 VNode 实例进行渲染。
（VNode：虚拟DOM，其实就是一个JS对象）

**3.2 参数**

| 参数名  | 值                 | 描述                             |
| ------- | ------------------ | -------------------------------- |
| include | 字符串或正则表达式 | 只有名称匹配的组件会被缓存。     |
| exclude | 字符串或正则表达式 | 任何名称匹配的组件都不会被缓存。 |
| max     | 数字               | 最多可以缓存多少组件实例。       |

注意: include/exclude 值是组件中的 name 命名，而不是路由中的组件 name 命名；

````js
// router.js
{
  path: '/home',
  name: 'home',
  component: () => import('../views/home.vue')
},
{ 
  path: '/test',
  name: 'test',
  component: () => import('../views/test.vue')
},

````



```vue
// App.vue
<keep-alive include="test">
   <router-view/>
</keep-alive>

补充： include/exclude 值的多种形式。

// 1. 将缓存 name 为 test 的组件(基本）
<keep-alive include='test'>
  <router-view/>
</keep-alive>
	
// 2. 将缓存 name 为 a 或者 b 的组件，结合动态组件使用
<keep-alive include='a,b'>
  <router-view/>
</keep-alive>
	
// 3. 使用正则表达式，需使用 v-bind
<keep-alive :include='/a|b/'>
  <router-view/>
</keep-alive>	
	
// 4.动态判断
<keep-alive :include='includedComponents'>
  <router-view/>
</keep-alive>
	
// 5. 将不缓存 name 为 test 的组件
<keep-alive exclude='test'>
  <router-view/>
</keep-alive>

// 6. 和 `<transition>` 一起使用
<transition>
  <keep-alive>
    <router-view/>
  </keep-alive>
</transition>

// 7. 数组 (使用 `v-bind`)
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>

```

```vue
// test.vue
<template>
  <div class="wrap">
    <input type="text" v-model="inputVal">
  </div>
</template>

<script>
export default {
  name:'test',
  data(){
    return {
      inputVal:'',
    }
  }
}
</script>
```

此时切换路由，我们就会发现 test 文件内的 inputVal 会被缓存了，而 home 内的值没有被缓存。

此外，我们还可以通过路由中的 meta 属性来控制，是否需要缓存。
将 test 路由中的 meta 添加 keepAlive 属性为 true，表示当前路由组件要进行缓存。

````js
// router.js
{
  path: '/home',
  name: 'home',
  component: () => import('../views/home.vue')
},
{ 
  path: '/test',
  name: 'test',
  meta:{
    keepAlive:true
  },
  component: () => import('../views/test.vue')
},

````

keep-alive 代码可以结合 v-if 进行包裹，如果 meta 中的 keepAlive 为 true 进行缓存，否侧不进行缓存。

```vue
<keep-alive>
  <router-view v-if="$route.meta.keepAlive" />
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" />

```

实际开发中，我们可以结合路由守卫来实现需要缓存组件的缓存。

