## 组件命名规范

> ### 必要的

- ### [组件名为多个单词](https://v2.cn.vuejs.org/v2/style-guide/#组件名为多个单词必要)

  **组件名应该始终是多个单词的，根组件 `App` 以及 `<transition>`、`<component>` 之类的 Vue 内置组件除外。**

  这样做可以避免跟现有的以及未来的 HTML 元素[相冲突](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)，因为所有的 HTML 元素名称都是单个单词的。

- ### [组件数据](https://v2.cn.vuejs.org/v2/style-guide/#组件数据必要)

  **组件的 `data` 必须是一个函数。**

  当在组件中使用 `data` property 的时候 (除了 `new Vue` 外的任何地方)，它的值必须是返回一个对象的函数。

- ### [Prop 定义](https://v2.cn.vuejs.org/v2/style-guide/#Prop-定义必要)

  **Prop 定义应该尽量详细。**

   在你提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。

- ### [为 `v-for` 设置键值](https://v2.cn.vuejs.org/v2/style-guide/#为-v-for-设置键值必要)

  **总是用 `key` 配合 `v-for`。**

  在组件上*总是*必须用 `key` 配合 `v-for`，以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为，比如动画中的[对象固化 (object constancy)](https://bost.ocks.org/mike/constancy/)，也是一种好的做法。

- ### [避免 `v-if` 和 `v-for` 用在一起](https://v2.cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起必要)

  **永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

  一般我们在两种常见的情况下会倾向于这样做：

  - 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。
  - 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)。

- ### [为组件样式设置作用域](https://v2.cn.vuejs.org/v2/style-guide/#为组件样式设置作用域必要)

  **对于应用来说，顶级 `App` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。**

  这条规则只和[单文件组件](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)有关。你*不一定*要使用 [`scoped` attribute](https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html)。设置作用域也可以通过 [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)，那是一个基于 class 的类似 [BEM](http://getbem.com/) 的策略，当然你也可以使用其它的库或约定。

  **不管怎样，对于组件库，我们应该更倾向于选用基于 class 的策略而不是 `scoped` attribute。**

  这让覆写内部样式更容易：使用了常人可理解的 class 名称且没有太高的选择器优先级，而且不太会导致冲突。

- ### [私有 property 名](https://v2.cn.vuejs.org/v2/style-guide/#私有-property-名必要)

  **使用模块作用域保持不允许外部访问的函数的私有性。如果无法做到这一点，就始终为插件、混入等不考虑作为对外公共 API 的自定义私有 property 使用 `$_` 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 `$_yourPluginName_`)。**

​	

> ### 强烈推荐

- #### [组件文件](https://v2.cn.vuejs.org/v2/style-guide/#组件文件强烈推荐)

  **只要有能够拼接文件的构建系统，就把每个组件单独分成文件。**

  当你需要编辑一个组件或查阅一个组件的用法时，可以更快速的找到它。

- ### [单文件组件文件名的大小写](https://v2.cn.vuejs.org/v2/style-guide/#单文件组件文件名的大小写强烈推荐)

  **[单文件组件](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。**

  单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。

- ### [基础组件名](https://v2.cn.vuejs.org/v2/style-guide/#基础组件名强烈推荐)

  **应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 `Base`、`App` 或 `V`。**

- ### [单例组件名](https://v2.cn.vuejs.org/v2/style-guide/#单例组件名强烈推荐)

  **只应该拥有单个活跃实例的组件应该以 `The` 前缀命名，以示其唯一性。**

  这不意味着组件只可用于一个单页面，而是*每个页面*只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，*只是目前*在每个页面里只使用一次。

- ### [紧密耦合的组件名](https://v2.cn.vuejs.org/v2/style-guide/#紧密耦合的组件名强烈推荐)

  **和父组件紧密耦合的子组件应该以父组件名作为前缀命名。**

  如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

- ### [组件名中的单词顺序](https://v2.cn.vuejs.org/v2/style-guide/#组件名中的单词顺序强烈推荐)

  **组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。**

- ### [自闭合组件](https://v2.cn.vuejs.org/v2/style-guide/#自闭合组件强烈推荐)

  **在[单文件组件](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)、字符串模板和 [JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html#JSX) 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做。**

  自闭合组件表示它们不仅没有内容，而且**刻意**没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。

  不幸的是，HTML 并不支持自闭合的自定义元素——只有[官方的“空”元素](https://www.w3.org/TR/html/syntax.html#void-elements)。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 HTML。

- ### [模板中的组件名大小写](https://v2.cn.vuejs.org/v2/style-guide/#模板中的组件名大小写强烈推荐)

  **对于绝大多数项目来说，在[单文件组件](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)和字符串模板中组件名应该总是 PascalCase 的——但是在 DOM 模板中总是 kebab-case 的。**

  PascalCase 相比 kebab-case 有一些优势：

  - 编辑器可以在模板里自动补全组件名，因为 PascalCase 同样适用于 JavaScript。
  - `<MyComponent>` 视觉上比 `<my-component>` 更能够和单个单词的 HTML 元素区别开来，因为前者的不同之处有两个大写字母，后者只有一个横线。
  - 如果你在模板中使用任何非 Vue 的自定义元素，比如一个 Web Component，PascalCase 确保了你的 Vue 组件在视觉上仍然是易识别的。

  不幸的是，由于 HTML 是大小写不敏感的，在 DOM 模板中必须仍使用 kebab-case。

  还请注意，如果你已经是 kebab-case 的重度用户，那么与 HTML 保持一致的命名约定且在多个项目中保持相同的大小写规则就可能比上述优势更为重要了。在这些情况下，**在所有的地方都使用 kebab-case 同样是可以接受的。**

- ### [JS/JSX 中的组件名大小写](https://v2.cn.vuejs.org/v2/style-guide/#JS-JSX-中的组件名大小写强烈推荐)

  **JS/[JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html#JSX) 中的组件名应该始终是 PascalCase 的，尽管在较为简单的应用中只使用 `Vue.component` 进行全局组件注册时，可以使用 kebab-case 字符串。**

- ### [完整单词的组件名](https://v2.cn.vuejs.org/v2/style-guide/#完整单词的组件名强烈推荐)

  **组件名应该倾向于完整单词而不是缩写。**

  编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

- ### [Prop 名大小写](https://v2.cn.vuejs.org/v2/style-guide/#Prop-名大小写强烈推荐)

  **在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 [JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html#JSX) 中应该始终使用 kebab-case。**

  我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

- ### [多个 attribute 的元素](https://v2.cn.vuejs.org/v2/style-guide/#多个-attribute-的元素强烈推荐)

  **多个 attribute 的元素应该分多行撰写，每个 attribute 一行。**

  在 JavaScript 中，用多行分隔对象的多个 property 是很常见的最佳实践，因为这样更易读。模板和 [JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html#JSX) 值得我们做相同的考虑。

- ### [模板中简单的表达式](https://v2.cn.vuejs.org/v2/style-guide/#模板中简单的表达式强烈推荐)

  **组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。**

  复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的*是什么*，而非*如何*计算那个值。而且计算属性和方法使得代码可以重用。

- ### [简单的计算属性](https://v2.cn.vuejs.org/v2/style-guide/#简单的计算属性强烈推荐)

  **应该把复杂计算属性分割为尽可能多的更简单的 property。**

- ### [带引号的 attribute 值](https://v2.cn.vuejs.org/v2/style-guide/#带引号的-attribute-值强烈推荐)

  **非空 HTML attribute 值应该始终带引号 (单引号或双引号，以 JS 中未使用的为准)。**

  在 HTML 中不带空格的 attribute 值是可以没有引号的，但这鼓励了大家在特征值里*不写*空格，导致可读性变差。

- ### [指令缩写](https://v2.cn.vuejs.org/v2/style-guide/#指令缩写强烈推荐)

  **指令缩写 (用 `:` 表示 `v-bind:`、用 `@` 表示 `v-on:` 和用 `#` 表示 `v-slot:`) 应该要么都用要么都不用。**

​	





​		

## style标签属性

- lang=""  可以配置css的 预处理语言 如：scss、less、stylus
- scoped 是style 标签上的一个特殊属性(布尔值)。表示当前style 里的样式只属于当前模块，避免多个组件的样式互相污染。

## script标签 组件基础配置讲解

##  .vue  文件返回值

项目中有时候会遇到父子组件传值的问题，比如子组件需要接收父组件方法并获取该方法返回值的时候。
使用`this.$emit('方法名', '参数1', '参数2')`的方式，获取到不是父组件方法的`return`值。但是我们可以将参数改为回调函数的形式，父组件里执行该回调函数，返回值后给子组件，子组件再接收返回值。
示例：
父组件 `GetCallback.vue`

```vue
<template>
  <div>
    我是父组件
    <CallbackChild1 @getData="getData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CallbackChild1 from '@/components/CallbackChild1.vue';

@Component({
  components: {
    CallbackChild1,
  },
})
export default class GetCallback extends Vue {
  getData(callback: FunctionConstructor): void {
    const name = '我是父组件的值';
    callback(name); // 父组件执行作为参数的函数
  }
}
</script>
```

子组件 `CallbackChild1.vue`

```vue
<template>
  <div>
    <p>我是子组件</p>
    <button @click="getDataFromParent">子组件获取父组件返回值</button>
    <span>返回值：{{ value }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CallbackChild1 extends Vue {
  value = '';

  getDataFromParent(): string {
  	// 子组件接收函数的值
    this.$emit('getData', (val: string) => { this.value = val });
    return this.value;
  }
}
</script>
```

## 组件注册

- ##### 全局组件注册

  ```js
  // 1. 按需导入 createApp 函数
  import { createApp } from 'vue'
  // 2. 导入待渲染的 App.vue 组件
  import App from './App.vue'
  
  // 1. 导入需要被全局注册的组件
  import Swiper from './components/01.globalReg/Swiper.vue'
  import Test from './components/01.globalReg/Test.vue'
  
  // 3. 调用 createApp 函数，创建 SPA 应用的实例
  const app = createApp(App)
  
  // 2. 调用 app.component() 方法全局注册组件
  app.component('MySwiper', Swiper)
  app.component('MyTest', Test)
  
  // 4. 调用 mount() 把 App 组件的模板结构，渲染到指定的 el 区域中
  app.mount('#app')
  ```

- ##### 局部注册组件

  ```vue
  <script>
  import Search from './components/02.privateReg/Search.vue'
  
  export default {
    // 组件的名称
    name: 'MyApp',
    components: {
      'my-search': Search,
    },
  }
  </script>
  
  ```

  ## 全局注册和局部注册的区别

  被全局注册的组件，可以在全局任何一个组件内使用
  被局部注册的组件，只能在当前注册的范围内使用

​		应用场景：

​          如果某些组件在开发期间的使用频率很高，推荐进行全局注册；
​           如果某些组件只在特定的情况下会被用到，推荐进行局部注册。

​			

​	



