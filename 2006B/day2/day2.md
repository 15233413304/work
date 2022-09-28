### vue常用内置指令

  v-text：适用于纯文本 和{{}}写法是一样的，如果需要改变部分文案内容不适合使用该指令

```html
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

  v-html：可用于渲染含有标签内容的字符串 '<span>比如这样</span>'，原理是innerHTML，官方不建议使用（可能导致xss注入）

  v-show：可以控制元素的显示隐藏，原理是控制css属性{display: none}（频繁切换时使用）
  v-if：可以控制元素的显示隐藏，与v-show不同的是，v-if每次隐藏都会销毁元素，显示则是重新渲染
  v-else 
  v-else-if    多个不同条件时可以使用v-else  v-else-if 在v-if、v-else、v-else-if中间不能有其他元素
  v-for：用于多次渲染元素，可以循环数组、对象、数字 `v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示

```html
<div v-for="(item,index) in items" :key="item.id">
  {{ item.text }}
</div>
```

  v-on：绑定事件监听器

```shell
原生写法：onclick,oninput,
v-on写法：v-on:click,v-on:input
缩写写法：@click,@input
```

  v-bind：动态地绑定一个或多个 attribute，或一个组件 prop 的表达式。` v-bind:`可以不写字母缩写为`:`

```vue
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>
```

  v-model：在表单控件或者组件上创建双向绑定

### 核心生命周期介绍

#### created

> 在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 $el property 目前尚不可用。

#### mounted

> 实例被挂载后调用，这时 el 被新创建的 `vm.$el` 替换了。如果根实例挂载到了一个文档内的元素上，当 `mounted` 被调用时 `vm.$el` 也在文档内。

### vue全局配置项 

#### template

- 一个字符串模板作为 Vue 实例的标识使用。模板将会替换挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

##### 什么是template

在vue文件中，template的作用是模板占位符，可帮助开发者包裹元素，可创建组件模板内容；但在循环过程当中，template不会被渲染到页面上。

注意：template标签是不会被DOM解析，生成DOM元素的时候会被隐藏，而组件又必须只能有一个根节点。



#### render

- 我们在web页面绝大多的操作和逻辑都是处理DOM元素，过于频繁的 DOM 操作可能会导致整个页面掉帧、卡顿甚至失去响应。而且操作真实DOM时页面会一直重新渲染（重排/重绘）， 虚拟DOM利用了js执行速度快，可以修改真实DOM中需要修改的部分然后再生成真实DOM渲染到页面上，所以vue就通过render实现了虚拟dom的渲染。
- template模版上的内容，最终会通过render渲染到根节点上。

- 官方说法：render是字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 ` createElement ` 方法作为第一个参数用来创建 ` VNode `

- createElement 有三个参数：

  - 第一个参数（必要参数）：主要用于提供DOM的html内容（标签或组件），类型可以是字符串、对象或函数
  - 第二个参数（类型是对象，可选）：用于设置这个DOM的一些样式、属性、传的组件的参数、绑定事件之类
  - 第三个参数（类型是数组，数组元素类型是VNode，也可以是内容，可选）：主要是指该结点下还有其他结点，用于设置分发的内容，包括新增的其他组件。注意，组件树中的所有VNode必须是唯一的
    
  


### vue组件基础配置项

#### [data](https://v2.cn.vuejs.org/v2/api/#data)

> Vue 实例的数据对象。Vue 会递归地把 data 的 property 转换为 getter/setter，从而让 data 的 property 能够响应数据变化。对象必须是纯粹的对象 (含有零个或多个的 key/value 对)：浏览器 API 创建的原生对象，原型上的 property 会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。

#### [watch](https://v2.cn.vuejs.org/v2/api/#watch)

> 一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个 property。
#### [computed](https://v2.cn.vuejs.org/v2/api/#computed)

> 计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

#### [methods](https://v2.cn.vuejs.org/v2/api/#methods)

> methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

### Class 与 Style 绑定

#### 对象语法和数组语法

```html

<div :class="{ active: isActive }"></div>
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<script>
  new Vue({
    data: {
      isActive:true,
      isB: true,
      isC: false
    } 
  })
</script>
```