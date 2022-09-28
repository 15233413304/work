## 一、什么是生命周期

Vue生命周期是指vue实例对象从创建之初到销毁的过程。

## 二、生命周期中的钩子函数

1.beforeCreate

          beforeCreate() {
            // 还未进行数据代理
    
            // 此时无法通过vm访问data中的数据，methods中的方法
    
           },

2.created

          created() {
            //    已完成初始化
    
            //    可以通过vm访问data中的数据，methods中的方法
    
           },

3.beforeMount

           eforeMount() {
            //    页面呈现的是未经Vue编译的DOM页面
    
            //    所有对DOM的操作，最终都不会起作用
    
           },

4.mounted

           mounted() {
               // 页面呈现的是经Vue编译的DOM页面
    
                // 对DOM的操作，会起作用
    
           },

5.beforeUpdate

           beforeUpdate() {
            //    此时数据已更新，但页面还是旧的
    
            //    数据与页面不一致
    
           },

6.updated

           updated() {
            //    此时数据和页面都以更新
    
           },

7.beforeDestroy         

           beforeDestroy() {
            //    vm中所有的data、methods、指令都可以用
    
            //    在此阶段一般进行：关闭定时器，解除自定义事件等操作
    
           },

8.destroyed

    			 destroyed() {
    				//   vm中所有的data、methods、指令都不可以用
    
           },




## **三、vue中内置的方法 属性和vue生命周期的运行顺序（methods、computed、data、watch、props)**

**props => methods =>data => computed => watch**



## 四、data

data为什么是一个函数

```js
const CompoenntData = {
  list:[]
};

const A = () => CompoenntData;
const B = () => CompoenntData;

A().list.push('1');

console.log(B().list.length); // ???
```

```js
const A = () => ({list:[]});
const B = () => ({list:[]});

A().list.push('1');

console.log(B().list.length); // ???
```

- vue中data 是可以直接写成一个对象的,但这是保证这个组件不会被复用的情况下
- 由于组价的复用,其实是创建多个vue实例,如果data中仍然是只是一个对象,那么其实创建出来的实例保持的都是对同一个对象的引用。
- 所以我们通过 一个 函数执行返回了一个新的全新的数据对象

### 五、props

- props

  - 静态props

    ```js
    props: [ 'a ', 'b']   // 定义一个数组格式， 数组中每一项都是变量
    ```

  - 动态props

    父组建动态传给子组件

  - props校验  

    ```js
    props:{
      a:{
        type:string,
          default:() => ''
      }
    }
    ```

    

### 六、 组件间通信

  - 父向子通信 props
  - 子向父通信 $emit
  - $parent
  - $children
  - $attrs
    - 我们有三个组件A-B-C，然后想A中的属性传入C中，基本的做法是这样的，一层一层通过props往下传递
    - 但是B中并没有使用到A中传递过来的属性，写props代码就是多余的了，那么$attrs可以接受上级传递过来的属性，那么我们就可以直接把$attrs传入下级
  - $listener
    - 使用$attrs ，inheritAttrs 属性 能够使用简洁的代码，将A组件的数据传递给C组件.
      此时我们又想到了一个问题，c组件的信息，怎么同步给a组件呢？ 
      vue2.4版本新增了$listeners 属性，我们在b组件上 绑定 v-on=”$listeners”, 在a组件中，监听c组件触发的事件。就能把c组件发出的数据，传递给a组件。
  - $set
    - 只要值的地址没有改变，vue是检测不到数据变化的。
    - 共有下面三种情况：
      - 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
      - 当你修改数组的长度时，例如：vm.items.length = newLength
      - 由于 JavaScript 的限制，Vue不能检测对象属性的添加或删除
  - $forceUpdate
    - this.$forceUpdate();进行强制渲染;一般用于因为数据层次太多，render函数没有自动更新，需手动强制刷新。