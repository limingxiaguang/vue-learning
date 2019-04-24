# 使用slot分发内容
*slot是2.6以前的版本，2.6增加了[v-slot](https://cn.vuejs.org/v2/api/#v-slotx)（推荐）*
### 1.1 什么是slot？

我们先看一个比较常规的网站布局，如图 7-3 所示。

![](https://ws1.sinaimg.cn/large/006rYhJMgy1g2ci9ra9csj318x0mznf0.jpg)

这个网站由一级导航、 二级导航、左侧列表、正文以及底部版权信息 5 个模块组成，如果要 将它们都组件化，这个结构可能会是：
```html
<app>
    <menu-main></menu-main>
    <menu-sub></menu-sub>
    <div class="container">
        <menu-left></menu-left>
        <container></container>
    </div>
    <app-footer></app-footer>
</app>
```
当需要让组件组合使用，混合父组件的内容与子组件的模板时，就会用到` slot `， 这个过程叫作 ***内容分发***（` transclusion `）。以` <app> `为例，它有两个特点： 

- ` <app> `组件不知道它的挂载点的内容是什么挂载点的内容是由` <app> `的父组件决定的
- ` <app> `可能有自己的模板

` props `传递数据、` events `触发事件和` slot `内容分发就构成了` Vue `组件的` 3 `个` API `来源，再复杂的组件也是由这` 3 `部分构成的

### 1.2 作用域

要了解` slot `，知道一个概念：编译的作用域，比如父组件中有如下模板：
```html
<child-component>
    {{ message }}
</child-component>
```
这里的` message `就是一个` slot `，但是它绑定的是父组件的数据，并不是组件` <chlid-component> `的数据

父组件模板的内容是在父组件作用域内编译，子组件模板的内容是在子组件作用域内编译。 例如下面的代码示例：
```html
<div id="app">
    <child-component v-show="showChild"></child-component>
</div>
<script>
    Vue.component('child-component', {
        template: '<div>子组件</div>'
    })
    var vm = new Vue({
        el: '#app',
        data: {
            showChild: true
        }
    })
</script>
```
这里的状态` showChild `绑定的是父组件的数据，如果想在子组件上绑定，那应该是：
```html
<div id="app">
    <child-component></child-component>
</div>
<script>
    Vue.component('child-component', {
        template: '<div v-show="showChild">子组件</div>',
        data: function() {
            return {
                showChild: true
            }
        }
    })
    var vm = new Vue({
        el: '#app'
    })
</script>
```

### 1.3 slot的用法

**单个slot**

在子组件内使用特殊的＜slot>元素就可以为这个子组件开启一个` slot `（***插槽***），在父组件模板 里，插入在子组件标签内的所有内容将替代子组件的` <slot> `标签及它的内容。示例代码如下：
```html
<div id="app">
    <child-component>
        <p>分发内容</p>
        <p>更多分发内容</p>
    </child-component>
</div>
<script>
    Vue.component('child-componnent', {
        template: '\
            <div>\
                <slot>\
                <p>如果父组件没有插入内容，我将默认出现</p>\
                </slot>\
            </div>'
    })
    new Vue({
        el: '#app'
    })
</script>
```
子组件 child-component 的模板内定义了一个＜slot>元素，并且用一个＜p＞作为默认的内容， 在父组件没有使用 slot 时，会渲染这段默认的文本；如果写入了 slot， 那就会替换整个＜slot> 。所 以上例渲染后的结果为：
```html
<div id="app">
    <div>
        <p>分发内容</p>
        <p>更多分发内容</p>
    </div>
</div>
```
> 注意，子组件` <slot> `内的备用内容，它的作用域是子组件本身．

**具名slot**

给` <slot> `元素指定一个` name `后可以分发多个内容，具名` Slot `可以与单个` Slot `共存，例如下面 的示例：
```html
<div id="app">
    <child-component>
        <h1 slot="header">标题</h1>
        <p>分发内容</p>
        <p>更多分发内容</p>
        <div slot="footer">底部消息</div>
    </child-component>
</div>
<script>
    Vue.component('child-componnent', {
        template: '\
            <div>\
                <div class="header">\          
                    <slot name="header"></slot>\
                </div>\
                <div class="main">\          
                    <slot></slot>\
                </div>\
                <div class="footer">\          
                    <slot name="footer"></slot>\
                </div>\
            </div>'
    })
    new Vue({
        el: '#app'
    })
</script>
```
子组件内声明了 3 个` <slot> `元素，其中在` <div class＝"main"> `内的` <slot> `没有使用` name `特性， 它将作为默认` slot `出现，父组件没有使用` slot `特性的元素与内容都将出现在这里。 如果没有指定默认的匿名` slot `，父组件内多余的内容片段都将被抛弃。 上例最终渲染后的结果为：
```html
<div id="app">
    <div>
        <div class="header">          
            <h1>标题</h1>
        </div>
        <div class="main">          
            <p>分发内容</p>
            <p>更多分发内容</p>
        </div>
        <div class="footer">          
            <div>底部消息</div>
        </div>
    </div>
</div>
```
在组合使用组件时，内容分发 API 至关重要。

### 1.4 作用域插槽

作用域插槽是一种特殊的` slot `，使用一个可以复用的模板替换己渲染元素。概念比较难理解， 我们先看一个简单的示例来了解它的基本用法。示例代码如下：
```html
<div id="app">
    <child-component scope="props">
        <p>来组父组件的内容</p>
        <p>{{props.msg}}</p>
    </child-component>
</div>
<script>
    Vue.component('child-componnent', {
        template: '\
                <div class="container">\          
                    <slot msg="这是来自子组件的内容"></slot>\
                </div>\
    })
    new Vue({
        el: '#app'
    })
</script>
```
观察子组件的模板，在` <slot> `元素上有一个类似` props `传递数据给组件的写法` msg＝"xxx" `，将 数据传到了插槽。父组件中使用了` <template> `元素，而且拥有一个` scope＝"props" `的特性，这里的` props `只是一个临时变量，就像` v-for="item in items" `里面的` item `一样。` template `内可以通过临时变量` props `访问来自子组件插槽的数据` msg `。 

将上面的示例渲染后的最终结果为：
```html
<div id="app">
        <div class="container">   
            <p>来组父组件的内容</p>
            <p>这是来自子组件的内容</p>
    </div>
</div>
```
作用域插槽更具代表性的用例是列表组件，允许组件自定义应该如何渲染列表每一项。

示例代码如下：

```html
<div id="app">
    <my-list :books="books">
        <!-- 作用域插槽也可以是具名插槽 -->
        <template slot="book" scope="props">
            <li>{{props.bookName}}</li>
        </template>
    </my-list>
</div>
<script>
    Vue.component('my-list', {
        props: {
            books: {
                type: Array,
                default: function() {
                    return []
                }
            }
        }
        template: '\
                <ul class="container">\          
                    <slot name="book"\
                    v-for="book in books"\
                    :book-name="book.name">\
                    <!-- 这里也可以写默认 slot 内容 -->\
                    </slot>\
                </ul>\
    })
    new Vue({
        el: '#app',
        data() {
            return {
                books: [
                    {name:'《Vue. js 实战》'},
                    {name:'《JavaScript 语言精粹》'},
                    {name:'《JavaScript 高级程序设计》'}
                ]
            }
        }
    })
</script>
```
子组件` my-list `接收一个来自父级的` prop `数组` books `， 并且将它在` name `为` book `的` slot `上使用` v-for `指令循环，同时暴露一个变量` bookName `。 

如果你仔细揣摩上面的用法，你可能会产生这样的疑问： 我直接在父组件用` v-for `不就好了吗， 为什么还要绕一步， 在子组件里面循环呢？的确， 如果只是针对上面的示例，这样写是多此一举的。 此例的用意主要是介绍作用域插槽的用法， 并没有加入使用场景， 而 ***作用域插槽的使用场景就是既可以复用子组件的` slot `，又可以使` slot `内容不一致*** 。如果上例还在其他组件内使用，` <li> `的内容渲 染权是由使用者掌握的，而数据却可以通过临时变量（比如` props `）从子组件内获取

### 1.5 访问slot

在` Vue. l.x `中 ， 想要获取某个` slot `是比较麻烦的， 需要用` v-el `间接获取。而` Vue.js 2.x `提供了用来访问被` slot `分发的内容的方法` $slots ` ，` $slots `在业务中几乎用不到， 在用` render `函数（进阶篇中将介绍）创建组件时会比较有用，但 主要还是用于独立组件开发中。
