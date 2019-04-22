## v-bind 以及style与class绑定

<hr>

### 1.1了解v-bind指令

前面我们已经说过了` v-bind `的语法和语法糖，主要是用来动态更新` DOM `的属性的值，回顾一下以前的那个例子：

```
<div id="app">
    <a v-bind:href="url">黎明霞光</a>
    <img v-bind:src="url_img">
</div>
<script>
    var vm = new Vue() {
        el: '#app',
        data() {
            return {
                url: 'http://www.limingxiagaung.com',
                url_img: 'F:/htmlCode/vueDemo/logo.jpg'
            }
        }
    }
</script>
```

在这个例子中，` href `和` src `都被动态设置了，当数据改变时，他们会重新渲染

在数据绑定中，最常见的两个需求就是元素的样式名称` class `和内联样式` style `的动态绑定，它们也是` HTML `的属性，因此可以使用 ` v-bind `指令。我们只需要用` v-bind `计算出表达式最终的字符 串就可以，不过有时候表达式的逻辑较复杂，使用字符串拼接方法较难阅读和维护，所以` Vue.js `增 强了对` class `和` style `的绑定。


### 1.2 绑定class的几种方式


#### 1.2.1 对象语法

给` class `设置一个对象，可以动态的切换` class `，例如：

```
<div id="app">
    <p :class="{'change': changed }"></p>
</div>
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            changed: true
        }
    }
})
</script>

```
> 上面的` :class `等同于` v-bind:class `，是一个语法糖，如不特殊说明，后面都将使用语法糖 

上面的最终渲染的结果为` <div id="app"><p class="change"></p></div>`

> 对象中也可以传入多个属性，来动态切换 class。另外，` ：class `可以与普通` class `共存,像这种：
```
<div :clss="{'change': changed,'error':notChange}"></div>
```

当其对应的值为真时，对应的类就会被渲染上，当对应的值改变对应的` class `会重新渲染

当` :class对应的表达式过于长或者复杂时，这时我们可以绑定一个计算属性，这是一种非常友好和常见的用法，一般条件多于两个或者两个以上时，适合使用data或computed，例如下面使用：

```
<div id="app">
    <div :class="calsss">
</div>
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            isActive: 'true',
            error: null
        }
    }
    computed: {
        calsss: function() {
            return {
                'active': this.isActive && !this.error,
                'text-fail': this.isActive && this.error.type == 'fail'
            }
        }
    }
})
</script>

```
> 除了计算属性，你也可以直接绑定一个` 0bject `类型的数据，或者使用类似计算属性的` methods `

#### 1.2.2 数组语法

当需要应用多个` class `时， 可以使用数组语法， 给` :class `绑定一个数组，应用一个` class `列表：
```
<div id="app">
    <div :class＝"[activeCls , errorCls)]"></div>
</div> 
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            activeCls: 'active',
            errorCls: 'error'
        }
    }
})
</script>
```
最终的渲染结果为：` <div class＝"active error"></div> `

也可以使用三元运算符来按条件切换` class `

```
<div id="app">
    <div :class＝"[isActived ? activeCls: '' , errorCls)]"></div>
</div> 
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            isActived: true,
            activeCls: 'active',
            errorCls: 'error'
        }
    }
})
</script>
```
显示结果和上面的一样：` <div class＝"active error"></div> `

当然数组也可以和对象一样使用` data `、` methods `、` computed `，以计算属性为例：

```
<div id="app">
    <div :class＝"classes"></div>
</div> 
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            disabled: 'true',
            size: 'large'
        }
    },
    computed: {
        classes: function() {
            return [
                'btn',
                {
                    ['btn-' + size]: this.large != '',
                    ['btn-disabled']: this.disabled
                }
            ]
        }
    }
})
</script>
```
最终的渲染结果为：` <div class＝"btn btn-disabled btn-large"></div> `

使用计算属性给元素动态设置类名，在业务中经常用到，尤其是在写复用的组件时，所以在 开发过程中，如果表达式较长或逻辑复杂，应该尽可能地优先使用计算属性。

#### 1.2.3 在组件上使用

如果直接在自定义组鉴上使用` class `或者` :class `,样式都会直接绑定到组件的根元素上，如声明一个简单的组件：

```
Vue.compontent('my-component',{
    template: '<p class="article">这是一些文字</p>'
})
```

调用我们的自定义组件，以前面的对象语法为例：

```
<div id="app">
    <my-component :class="{'active': isActived}"></my-component>
</div>

<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            isActived: true
        }
    }
})
</script>
```
最终的渲染结果为：` <p class＝"article active">这是一些文字</p> `

>这种用法仅适用于自定义组件的最外层是一个根元素，否则会无效，当不满足这种条件或需 要给具体的子元素设置类名时，应当使用组件的` props `来传递。这些用法同样适用于绑定内联样式` style `的内容。

### 1.3 绑定内联样式

使用` v-bind:style `(缩写` :style `)可以给元素绑定内联样式，和` :class `一样也有对象、数组等的语法，看起来很像写在元素上的` css `:

```
<div id="app">
    <p :style="{'color': color, 'fontSize': fontSize + 'px'}">文本</p>
</div>
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            color: '#ffffff',
            fontSize: 16
        }
    }
})
</script>
```
> css 属性名称使用驼峰命名（` came!Case `）或短横分隔命名（` kebab-case `）

最终的渲染结果为：` <p :style="color: #ffffff, fontSize: 16px}">文本</p> `

大多数情况下，直接写一长串的样式不便于阅读和维护，所以一般写在` data `或` computed `里，以` data `为例改写上面的示例：

```
<div id="app">
    <p :style="styles">文本</p>
</div>
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            styles: {
                color: '#ffffff',
                fontSize: 16 + 'px'
            }
        }
    }
})
</script>
```
应用多个样式对象时， 可以使用数组语法：
```
<p :style="[styleA,styleB]">文本</p>
```
在实际业务中` style `的数组语法并不常用， 因为往往可以写在一个对象里面,而较为常用的应当是计算属性。另外，使用` :style `时,` Vue.js `会自动给特殊的` css `属性名称增加前缀,比如` transform `。

