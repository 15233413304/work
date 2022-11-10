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