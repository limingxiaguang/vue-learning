# 表单与内置指令

### 1.1 基础用法

你可以用` v-model `指令在表单` <input> `、` <textarea> `及` <select> `元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但` v-model `本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

```html
<div id = "app">
    <input type = "text" v-model="msg" placehoder="输入...">
    <p>{{msg}}</p>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                msg: ''
            }
        }
    })
</script>
```

当输入框中输入的数据发生改变时，` msg ` 的数据也会随着变化

> 注意：` v-model `会忽略所有表单元素的` value `、` checked `、` selected `特性的初始值而总是将` Vue `实例的数据作为数据来源。你应该通过` JavaScript `在组件的` data `选项中声明初始值。

` v-model `在内部使用不同的属性为不同的输入元素并抛出不同的事件：

- ` text `和` textarea `元素使用` value `属性和` input `事件；
- ` checkbox `和` radio `使用` checked `属性和` change `事件；
- ` select `字段将` value `作为` prop `并将` change `作为事件。

> 对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现` v-model `不会在输入法组合文字过程中得到更新。如果你也想处理这个过程，请使用` input `事件。

#### 1.1.1 复选框

单个复选框，绑定到布尔值：
```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```
多个复选框，绑定到数组：
```html
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
```
#### 1.1.2 文本

> 在文本区域插值` (<textarea>{{text}}</textarea>) `并不会生效，应用` v-model `来代替。

```html
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

#### 1.1.3 单选按钮

单选按钮在单独使用时，不需要` v-model `，直接使用` v-bind `绑定一个布尔类型的值， 为真时 选中， 为否时不选
如果是组合使用来实现互斥选择的效果，就需要` v-model `配合` value `来使用,
数据` picked `的值与单选按钮的` value `值一致时，就会选中该项：
```html
<div id=" app"> <input type=" radio ":checked="picked"> <label＞单选按钮＜／label>
</div> 
<script> 
var app =new Vue({
     el :'#app', 
     data() {
         return {
             picked: true
         }
     }
})
</script>
```
```html
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
<script>
    new Vue({
    el: '#example-4',
    data: {
        picked: ''
    }
    })
</script>
```

#### 1.1.4 选择框

` <option> `是备选项，如果含有` value `属性，` v-model `就会优先匹配` value `的值： 如果没有， 就会 直接匹配` <option> `的` text `。 给<selected>添加属性 multiple 就可以多选了， 此时 v-model 绑定的是一个数组， 与复选框用法类似

**单选时**

```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
<script>
    new Vue({
        el: '...',
        data: {
        selected: ''
    }
    })
</script>
```

如果` v-model `表达式的初始值未能匹配任何选项，` <select> `元素将被渲染为“未选中”状态。在` iOS `中，这会使用户无法选择第一个选项。因为这样的情况下，` iOS `不会触发` change `事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

**多选时 (绑定到一个数组)：**
```html
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
<script>
    new Vue({
    el: '#example-6',
    data: {
        selected: []
    }
    })
</script>
```
用 v-for 渲染的动态选项：
```html
<div id="example-5">
  <select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
 </select>
<span>Selected: {{ selected }}</span>
</div>
<script>
  new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
</script>
```

虽然用选择列表` <select> `控件可以很简单地完成下拉选择的需求，但是在实际业务中反而不常 用，因为它的样式依赖平台和浏览器，无法统一， 也不太美观，功能也受限，比如不支持搜索，所以常见的解决方案是用` div `模拟一个类似的控件

### 1.2 修饰符

与事件的修饰符类似，` v-model `也有修饰符，用于控制数据同步的时机。

-  **.lazy**

在输入框中，` v-model `默认是在` input `事件中同步输入框的数据（除了提示中介绍的中文输入法情况外），使用修饰符` .lazy `会转变为在` change `事件中同步

```html
<div id="app">
    <input type="text" v-model.lazy="msg">
    <p>{{msg}}</p>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                msg: ''
            }
        }
    })
</script>
```
> 这时，` msg `并不是实时改变的，而是在失焦或按回车时才更新。

- **.number**


使用修饰符` .number `可以将输入转换为` Number `类型，否则虽然你输入的是数字，但它的类型 其实是 ` String `，比如在数字输入框时会比较有用，示例代码如下：
```html
<div id="app">
    <input type="text" v-model.number="msg">
    <p>{{typeof msg}}</p>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                msg: ''
            }
        }
    })
</script>
```

- **.trim**

 ` .trim `可以自动过滤输入的首尾空格

 从 Vue. 2.x 开始， v-model 还可以用于自定义组件，满足定制化的需求