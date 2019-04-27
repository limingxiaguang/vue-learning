# 使用props进行通信

### 1.1 基本用法

组件不仅仅是要把模板的内容进行复用，更重要的是组件间要进行通信。通常父组件的模板 中包含子组件，父组件要正向地向子组件传递数据或参数，子组件接收到后根据参数的不同来渲染 不同的内容或执行操作。**这个正向传递数据的过程就是通过` props `来实现的**。 

在组件中，使用选项` props `来声明需要从父级接收的数据，` props `的值可以是两种， 一种是字符串数组，一种是对象，本小节先介绍数组的用法。比如我们构造一个数组，接收一个来自父级的 数据` message `，并把它在组件模板中渲染，示例代码如下：
```html
<div id="app">
    <my-component msg="来自父级的数据"></my-component>
</div>
<script>
    Vue.component('my-component',{
        props: ['msg'],
        template: '<div>{{msg}}</div>'
    })

    var vm = new Vue({
        el: '#app'
    })
</script>

```
渲染后的结果：
```html
<div id="app">
    <div>来自父级的数据</div>
</div>
```
` props `中声明的数据与组件` data `函数` return `的数据主要区别就是` props `的来自父级，而` data `中 的是组件自己的数据，作用域是组件本身，这两种数据都可以在模板` template `及计算属性` computed `和方法` methods `中使用。上例的数据` message `就是通过 ` props `从父级传递过来的，在组件的自定义 标签上直接写该` props `的名称，如果要传递多个数据，在` props `数组中添加项即可。 由于` html `特性不区分大小写，当使用` DOM `模板时，驼峰命名 (` camelCase `)的` props `名称 要转为短横分隔命名(` kebab-case `），例如：
```html
<div id="app">
    <my-component waring-text="提示信息"></my-component>
</div>
<script>
    Vue.component('my-component', {
        props: ['waringText']
    })
    var vm = new Vue({
        el: '#app'
    })
</script>
```
> 如果使用的是模板字符串，可以忽略这些限制

有时候，传递的数据并不是直接写死的，而是来自父级的动态数据，这时可以使用指令` v-bind `来动态绑定` props `的值，当父组件的数据变化时，也会传递给子组件。示例代码如下：
```html
<div id="app">
<input type="text" v-model="parentMessage">
    <my-component :msg="parentMessage"></my-component>
</div>
<script>
    Vue.component('my-component', {
        props: ['msg']
    })
    var vm = new Vue({
        el: '#app',
        data: {
            parentMessage: ''
        }
    })
</script>
```
这里用` v-model `绑定了父级的数据` parentMessage `，当通过输入框任意输入时，子组件接收到 的` props `, `"message"`也会实时响应，并更新组件模板。

> 如果你要直接传递数字、布尔值、数组、对象，而且不使用` v-bind `，传递的仅 仅是字符串，尝试下面的示例来对比：
```html
<div id="app">
    <my-component num="[1,2,3]"></my-component>
    <my-component :num="[1,2,3]"></my-component>
</div>
<script>
    Vue.compontent('my-component', {
        props: ['msg'],
        template: '<div>{{msg.length}}</div>'
    })
    var vm = new Vue({
    el：'#app'
    })
</script>
```
同一个组件使用了两次，区别仅仅是第二个使用的是` v-bind `，渲染后的结果，第一个 是 7，第二个才是数组的长度 3

### 1.2 单向数据流

` Vue 2.x `与` Vue l.x `比较大的一个改变就是，` Vue2.x `通过` props `传递数据是单向的了， 也就是 父组件数据变化时会传递给子组件，但是反过来不行。而在` Vue l.x `里提供了` .sync `修饰符来支持双 向绑定。之所以这样设计，是尽可能将父子组件解稿，避免子组件无意中修改了父组件的状态。 业务中会经常遇到两种需要改变` prop `的情况，一种是父组件传递初始值进来，子组件将它作 为初始值保存起来，在自己的作用域下可以随意使用和修改。这种情况可以在组件` data `内再声明 一个数据，引用父组件的` prop `，示例代码如下：

```html
<div id="app">
    <my-component :init-count="1"></my-component>
</div>
<script>
    Vue.component('my-component', {
        props: ['initCount'],
        template: '<div>{{count}}</div>'
    })
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                count: this.initCount
            }
        }
    })
</script>
```
组件中声明了数据` count `， 它在组件初始化时会获取来自父组件的` initCount `， 之后就与之无关了，只用维护` count `， 这样就可以避免直接操作` initCount `。 另一种情况就是` prop `作为需要被转变的原始值传入。这种情况用计算属性就可以了， 示例代码如下：
```html
<div id="app">
    <my-component :width="100"></my-component>
</div>
<script>
    Vue.component('my-component', {
        props: ['width'],
        template: '<div>这是个组件</div>',
        computed: {
            style: function() {
                return this.width + 'px'
            }
        }
    })
    var vm = new Vue({
        el: '#app',
    })
</script>
```
> 注意：` JavaScript `里面的对象数组都是引用类型，指向同一个内空间，所以` props `是对象或者数组时，在子组件中改变会影响父组件

### 1.3 数据验证

当` prop` 需要验证时，就需要对象写法。 一般当你的组件需要提供给别人使用时，推荐都进行数据验证，比如某个数据必须是数字类 型，如果传入字符串，就会在控制台弹出警告。 以下是几个` prop `的示例：
```js
Vue.component('my-component',{
    props: {
        propA: Number,
        //必须时数字类型
        propB: [string, number],
        // 数字类型或者字符串类型
        prop: {
            type: Boolean,
            default: true
            //布尔值，没有定义默认为true
        }，
        propD: {
            type: Number，
            required: true
            //／数字，而且是必传 
        }，
        propE: {
            type : Array,
             default : function (){
                 return []
                //  如果是数组或对象，默认值必须是一个函数来返回
             }
        },
        propF: {
            validator: function(value) {
                return value > 10
                // 自定义一个验证函数
            }
        }
    }
})
```
验证的` type `类型可以是：

- **String** 
- **Number** 
- **Boolean** 
- **Object** 
- **Array** 
- **Function** 

` prop `也可以是一个自定义构造器，使用` instanceof `检测。 当` prop `验证失败时，在开发版本下会在控制台抛出一条警告

### 1.4 组件通信

我们已经知道，从父组件向子组件通信，通过 props 传递数据就可以了，但 Vue 组件通信的场 景不止有这一种，归纳起来，组件之间通信可以用下图表示
![](https://ws1.sinaimg.cn/large/006rYhJMgy1g2bfzncu70j30t00fgn3w.jpg)

组件关系可分为父子组件通信、兄弟组件通信、跨级组件通信

#### 1.4.1  自定义事件

当子组件需要向父组件传递数据时，就要用到自定义事件。我们在介绍指令 v-on 时有提到， v-on 除了监昕 DOM 事件外，还可以用于组件之间的自定义事件。 

如果你了解过` JavaScript `的设计模式一一观察者模式， 一定知道` dispatchEvent `和` addEventListener `这两个方法。` Vue `组件也有与之类似的一套模式，子组件用` $emit() `来触发事件，父组件用` $on() `来监听子组件的事件。 

父组件也可以直接在子组件的自定义标签上使用` v-on `来监昕子组件触发的自定义事件，示例 代码如下：

```html
<div id="app">
    <p>总数： {{total}}</p>
    <my-component
    @increase="handelGetTotal" 
    @reduce="handelGetTotal"></my-component>
</div>
<script>
    Vue.component('my-component',{
        template: '\
        <div>\
        <button @click="handelIncrease"></button>\
        <button @click="handleReduce"></button>\
        </div>',
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            handelIncrease: function() {
                this.counter++
                this.$emit('increase',this.counter)
            },
            handleReduce: function() {
                this.counter--
                this.$emit('reduce',this.counter)
            }
        }
    })
    var vm = new Vue({
        el: '#app',
        data: {
            total: 0
        },
        method: {
            handelGetTotal(total) {
                this.total = total
            }
        }
    })
</script>
```
上面示例中，子组件有两个按钮，分别实现加` 1 `和减` l `的效果， 在改变组件的` data` "`counter`" 后，通过` $emit() `再把它传递给父组件， 父组件用` v-on:increase `和` v-on:reduce `（示例使用的是语法糖）。` $emit() `方法的 ***第一个参数是自定义事件的名称*** ， 例如示例的` increase `和` reduce `,***后面的参数都是要传递的数据，可以不填或填写多个***。

除了用 v-on 在组件上监听自定义事件外，也可以监昕 DOM 事件，这时可以用.native 修饰符 表示监听的是一个原生事件，监听的是该组件的根元素，示例代码如下：
```html
<my-component @increase="handelClick"></my-component>
```
#### 1.4.2  使用 v-model

` Vue2.x `可以在自定义组件上使用` v-model `指令，我们先来看一个示例:
```html
<div id="app">
    <p>总数：{{ total }}</p>
    <my-component v-model="total"></my-component>
</div>
<script>
    Vue.component('my-component', {
        template: '<button @click="handelClick">+1</button>',
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            handelClick: function() {
                this.counter++
                this.$emit('input', this.counter)
            }
        }
    })
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                total: 0
            }
        }
    })
</script>
```
组件` $emit() `的事件名是特殊的` input `，在使用组件的父级，井没有在` <my-component> `上使用` @input= "handler" `，而是直接用了` v-model `绑定的一个数据` total `。这也可以称作是一个语法糖，因为上面的示例可以间接地用自定义事件来实现：
```html
<div id="app">
    <p>总数：{{ total }}</p>
    <my-component @input="handelGetClick"></my-component>
</div>
<script>
    Vue.component('my-component', {
        template: '<button @click="handelClick">+1</button>',
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            handelClick: function() {
                this.counter++
                this.$emit('input', this.counter)
            }
        }
    })
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                total: 0
            }
        },
        methods： {
            handelGetClick: function(total) {
                return this.total = total
            }
        }
    })
</script>
```

v-model 还可以用来创建自定义的表单输入组件， 进行数据双向绑定，例如：
```html
<div id="app">
    <p>总数：{{ total }}</p>
    <my-component v-model="total"></my-component>
    <button @click="handleReduce">-1</button>
</div>
<script>
    Vue.component('my-component', {
        props: ['value'],
        template: '<input :value="value" @input="updateValue">+1</input>',
        methods: {
            updateValue: function(event) {
                this.$emit('input', event.target.value)
            }
        }
    })
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                total: 0
            }
        },
        methods: {
            handleReduce: function() {
                this.total--
            }
        }
    })
</script>
```

实现这样一个具有双向绑定的` v-model `组件要满足下面两个要求:

- 接收一个Value属性
- 在有新的Value时触发input事件

#### 1.4.3 非父子组件通信

在实际业务中，除了父子组件通信外，还有很多非父子组件通信的场景，非父子组件一般有两种，兄弟组件和跨多级组件。为了更加彻底地了解 ` Vue.js 2.x `中的通信方法，我们先来看一下在` Vue.js l.x `中是如何实现的，这样便于我们了解` Vue.js`的设计思想。 

**父链**

在子组件中，使用` this.$parent `可以直接访问该组件的父实例或组件，父组件也可以通过` this.$children `访问它所有的子组件，而且可以递归向上或向下无线访问， 直到根实例或最内层的组件。示例代码如下：
```html
<div id="app">
    {{message}}
    <component-a></component-a>
</div>
<script>
    Vue.component('component-a',{
        template: '<button @click="handellick">通过父链直接修改父链的数据</button>',
        methods: {
            hendelClick: function() {
                this.$parent.message = '来自组件component-a的内容'
                // 访问到父链后，可以做任何操作，比如直接修改数据
            }
        }
    })
    var vm  = new Vue({
        el: '#app',
        data() {
            return {
                message: ''
            }
        }
    })
</script>
```
> 尽管` Vue `允许这样操作，但在业务中， 子组件应该尽可能地避免依赖父组件的数据，更不应 该去主动修改它的数据，因为这样使得父子组件紧藕合，只看父组件，很难理解父组件的状态，因 为它可能被任意组件修改，理想情况下，只有组件自己能修改它的状态。父子组件最好还是通过` props `和` $emit `来通信。

**子组件索引**

当子组件较多时， 通过` this.$children `来一一遍历出我们需要的一个组件实例是比较困难的， 尤其是组件动态渲染时，它们的序列是不固定的。` Vue `提供了子组件索引的方法，用特殊的属性` ref `来为子组件指定一个索引名称，示例代码如下：

```html
<div id="app">
    <button @click="handekRef">通过ref获子组件的内容</button>
    <component-a ref="comA"></component-a>
</div>
<script>
    Vue.component('coponent-a', {
        template: '<div>子组件</div>'，
        data() {
            return {
                message: '子组件内容'
            }
        }
    })
    var vm = new Vue({
        el: '#app',
        methods: {
            handekRef: function() {
                var msg = this.$refs.comA.message
                console.log(msg)
                // 通过$refs 来访问指定的实例 
            }
        }
    })
</script>
```
在父组件模板中，子组件标签上使用` ref `指定一个名称，井在父组件内通过` this.$refs `来访问指 定名称的子组件。 

> ` $refs `只在渲染完成后才填充，并且它是非响应式的． 它仅仅作为一个直接访问子组件的应急方案，应当避免在模板或计算属性中` $refs `。

与` Vue l.x `不同的是，` Vue 2.x `将` v-el `和` v-ref `合并为了` ref `,`  Vue `会自动去判断是普通标签还是组件。可以尝试补全下面的代码，分别打印出两个` ref `看看都是什么：
```html
<div id="app">
    <p ref="p">内容</p>
    <child-component ref="child"></child-component>
</div>
<script>
    Vue.component('child-component', {
        template: '<div>child</div>'
    })
    var vm = new Vue({
        el: '#app',
       mounted: function() {
           var p = this.$refs.p
           var child = this.$refs.child
           console.log(p, child)
       }
    })
</script>
```
打印结果：

![](https://ws1.sinaimg.cn/large/006rYhJMgy1g2chzspl5qj30oz078q36.jpg)