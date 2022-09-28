### 1. 封装通用form表单组件

- 跨组件通信 provide（提供）、inject（注入）

  provide、inject可以在父子组件、跨级组件进行通讯

  provide是一个对象，或者是一个返回对象的函数

  inject是一个字符串的数组，或者是一个对象，在后代组件中都可以使用inject注入

  Provide、inject 不是响应式的，可以传过去一个响应式对象或者通过computed实现响应式
- EventBus

```js
// main.js中通过使用事件中心，允许组件自由交流，通过实例化一个空的 Vue 实例来实现
Vue.prototype.$bus = new Vue()
```

### 2.插槽

Vue 实现了一套内容分发的 API，将 <slot> 元素作为承载分发内容的出口,可以用来拓展、复用、定制组件

- 默认插槽
  它允许你像这样合成组件：

  ```vue
    <template>
      <my-component url="/profile">
        点我跳转
      </my-component>
    </template>
  ```

​        然后你在 <my-component> 的模板中可能会写为：


  ```vue
   <template>
      <a
        v-bind:href="url"
        class="nav-link"
      >
        <slot></slot>
      </a>
    </template>
  ```
  - 命名插槽（具名插槽）

  - 作用域插槽 

    在父组件里想要拿到子组件里的属性，不常用


### 3. Vue.extend动态创建组件

- Vue.extend

  动态创建组件啥意思？

  ​		只在事件触发的时候，才产生某组件。平时它并不存在

  Vue.extend()

  ​		extend创建的是一个组件构造器，而不是一个具体的组件实例 运用到了v-if

  v-if	

  ​		只在为true的时候渲染

  ​		根据表达式的值在DOM中  生成或移除HTML元素

  v-show

  ​		根据表达式的值来 现实或者隐藏 HTML元素

  使用场景：

  ​		1、动态渲染组件；

  ​		2、类似于 window.alert() 提示组件



### 4. mixins 混入

`mixins` 选项接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用的是和 `Vue.extend()` 一样的选项合并逻辑。也就是说，如果你的混入包含一个 `created` 钩子，而创建组件本身也有一个，那么两个函数都会被调用。

`Mixin` 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。

混入 `(mixin)` 提供了一种非常灵活的方式，来分发 `Vue` 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

1. 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

2. 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。

```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"

```

3. 组件的data、methods、directives等 会覆盖mixins里的同名data、methods、directives, 不同名的会进行合并



总结：

  钩子函数会先执行混入方法在执行自身方法，但是其他同名函数，组件自身会替换混入方法