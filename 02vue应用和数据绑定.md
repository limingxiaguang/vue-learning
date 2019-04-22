# vue应用和数据绑定

### 1.1 第一个vue实例

还记得我们上学时学c语言的方式吗？对就是那样，初学每门语言我们都是从第一个` hello world ！ `开始，我学vue也是这样哈哈哈...
<br />
第一个实列：
```
<!doctype html>
<head>
<title>vue-demo<title/>
</head>
<body>
    <div id="#app">
    <p>
    {{name}}
    </p>
    <input type="text" v-model="name" placeholder＝"你的名字">
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
    new Vue({
        el : '',
        data（）{
            return{
                name: ''
            }
        }
    })
    </script>
<body/>
</html>
```
效果图如下：

![](https://ws1.sinaimg.cn/mw690/006rYhJMgy1g25nxd09hlj30pj0gigsn.jpg)

这是最简单不过的`vue`代码，但它却体现除了`vue`最核心的功能：数据的双向绑定

### 1.2 Vue实例与数据绑定

#### 1.2.1 实例与数据

` Vue `应用的创建很简单，通过构造函数Vue可以创建` vve `的根实例

```
var vm = new Vue({
    #options...
})
```
` vm `就是` vue `的实例，几乎所有的代码都是对象，写进` vue `的实例的` options `里面

在` option `里面不能缺少的选项是` el ` ，它用来指定` vue `实例挂载在` DOM `的哪个元素上
我们可以通过` app.$el `来访问该元素，` vue `提供了很多实例的属性和方法都是通过$符号来访问的

在前面写的` hello world `代码中，在` input `标签上有` v-model `，` v-model `所对应的值就是我们在` data `里面定义的` name `字段，这就是Vue的数据绑定

通过vue里面的data属性可以声明应用所需要双向绑定的数据

Vue 实例也代理了data里面的所有属性，所以可以这样写:

```
var vm = new Vue({
    el: '#app',
    data() {
        return {
            helloWorld: '你好， 世界 ！'
        }
    }
})

console.log(vm.helloWorld)  //你好， 世界 ！
```
除了显式声明外，还可以声明一个已有的变量，他们之间默认建立了一个双向绑定，改变其中某一个另外一个也会随着改变
```
var myData = {
    name: '哈哈哈'
}
var vm = new Vue ({
    el: '#app',
    data：myData
})

console.log(myData.name,vm.name)    // 哈哈哈 哈哈哈

vm.name = "你笑啥呢"
console.log(myData.name,vm.name)    // 你笑啥呢 你笑啥呢

myDtaa.name = "Vue好神奇"
console.log(myData.name,vm.name)    // Vue好神奇 Vue好神奇
```

#### 1.2.2 生命周期

` vue `的创建会经过一些列的初始化等过程，也会调用相应的生命周期的钩子函数，

我们可以在适当钩子函数来处理我们的业务逻辑，就像` jQuery `的` ready() `方法一样（可能没用过` jq `，但不碍事理解）我把代码给你看看
```
$(docoment).ready(function () {
    //DOM加载完成后执行此处代码
})
```
` vue `常用的生命钩子有：

` created ` ： 实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，` $el `还不可用。

` mounted ` ：` el ` 挂载到实例上后调用，一般我们的业务逻辑会从这里开始

` beforeDestory ` ： 实例在销毁之前调用，用来解绑一些使用addEventListener监听事件、定时器等

这些钩子和` el `、`  data `一样也是作为选项写入到` vue `实例内，并且这些钩子中的` this `指向调用它的` vue `实例

```
...
<div id = "app"></div>
...
var vm = new Vue ({
    el: '#app',
    data: {
        a: 1
    },
    created: function () {
        console.log(this.$el)  //<div id = "app"></div>
    },
    mounted: function () {
        console.log(this.a) //1
    },
    beforeDestory: function () {
        console.log(this.a)  //1
    }

})
```

完整的生命周期图：

![](https://cn.vuejs.org/images/lifecycle.png)

#### 1.2.3、插值与表达式

使用大括号（Mustache语法）,` “{{}}” `是最基本的文本的插值方法，来实现数据的双向绑定

例如：

```
... 
    <div id="app">
        <div>
            {{weChat}}
        </div>
    </div>
...
    <script>
        var vm = new Vue({
            el: "#app",
            data() {
                return {
                    weChat: '佳明小分享'
                }
            }
        })
    </script>
```
大括号里面的内容会被替换成“佳明小分享”，改变任意方式的数据，另外一个都会随着改变

下面一个例子来实时显示当前的时间，每秒更新：

```
...
    <div id=”app”>
        { { date }t}
    <div>
    ...
    <script>
        var vm = new Vue ({
            el: '#app',
            data: {
                date: new Date ()
            },
            mounted: function () {
                var _this = this; //声明一个变量指向 ` Vue ` 实例 ` this ` ，保证作用域一致
                this.timer= setinterval(function() {
                    _this.date= new Date(); //修改数据 ` date `
                }, 1000);
            }
            beforeDestroy: function (} {
                if (this. timer) {
                clearinterval(this.t 工mer); //在 Vue 实例销毁前，清除我们的定时器
                }
            }
        })
    </script>
...

```

这里的{{date}}输出的是浏览器的默认格式，如2019-05-02T14:04:49.470Z

如果我们想输出html的标签，而不是纯文字的，这时我们就可以使用v-html指令来输出,如：

```
<div>
<p v-html="link-blog"></p> //p里面的输出的就是a标签
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data() {
            return {link-blog: '<a href="http://www.limingxiagaung.com">黎明霞光</a>'
            }
        }
    })
</script>

```

> 注意:这样给用户输入时会带来不必要的` XSS `攻击,所以要在服务端对用户提交的内容进行
处理， 一般可将尖括号“＜ ＞”转义。

如果想显示`{{}}` 让其不被渲染，可以使用` v-pre `指令

在` {{}} `中，除了简单的绑定属性值外，还可 以使用 JavaScript 表达式进行简单的运算 、 三元运
算等，例如 ：

```
<div id="app">
    {{number / 10}}  //10
    {{isOk?'ok': 'not ok'}}  //not ok
    {{text.split(',').reverse().join（',')}} //vue,hello
</div>
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            number: 100,
            isOk: false,
            text: 'hello,vue'
        }
    }
})
</script>

```

> ` Vue .js `只支持单个表达式，不支持语句和流控制，另外， 在表达式中，不能使用用户自定义
的全局变量，只能使用` Vue `白名单内的全局变量， 例如` Math `和` Date `。 以下是一些无效的示例：

```
〈!--这是语旬，不是表达式--〉
{{ var book = "Vue . js 实战"}}
〈!--不能使用流控制，要使用三元运算--〉
{{ if (ok) return msg }}

```

#### 1.2.4、过滤器

` vue.js `支持在` {{}} `插值的尾部插入` " | " `来对数据进行过滤，经常用于格式化文本，，比如文字全部大写，货币千位用逗号隔开，过滤的规则是自定义的，通过给` Vue `添加选项` fliters `设置，下面是时间格式化处理的例子：

```
<div id="app">
{{date | formatDate}}
</div>
<script>
var padDate = function(value) {
    //处理value，当月、日、时、分、秒小于10时在前面补0
    return value<  10 ? '0' + value : value
}
var vm = new Vue({
    el: '#app',
    data() {
        return {
            date: new Date()
        }
    },
    fliters: {
        formatDate: function() {
            var date = new Date(value) //过滤value
            var year = date.getFullYear()
            var month = padDate(date.getMonth() + 1)
            var day = padDate(date.getDate())
            var hours = padDate(date.getHuors())
            var minutes = padDate(date.getMinutes())
            var secondes = padDate(date.getSeconds())
            //返回处理好的时间格式
            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes
        }
    }，
    mounted: function() {
        var _this = this  //声明一个变量指向 Vue 实例 this ，保证作用域一致
        this.timer = setInterval(function() {
            _this.date = new Date()
        },1000)

        //或者这样写也是可以的
        //this.timer = setInterval(() => {
        //   this.date = new Date()
        //})
    },
    //在Vue实例被销毁前要把定时器清除，定时器不会随着vue实例销毁而清除，会造成内存泄漏
    beforeCreated: function() {
        if(this.timer) {
            clearInterval(this.timer) //清除定时器
        }
    }
})
</script>

```

>过滤器也可以串联，而且可以接收参数，例如：
```
〈!--串联--〉

{{message | filterA | filterB } }

〈!--接收参数--〉

{{ message | filterA ('argl ’，'arg2')}}

这里的字符串arg1 和 arg2 将分别传给过滤器的第二个和第三个参数，因为第一个是数据本身。
```

