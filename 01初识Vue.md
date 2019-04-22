# 前端小白学VUEJS之路

因工作需要我最近开始从零学vue，一步一步学习vue，有兴趣的可以关注我哦，也欢迎大佬来指导、交流(文章参考<<Vue实战>>)一书和vue中文官方教程来写的）


## 一、初识vue

### 1.1、vue是什么？

`Vue` (读音 /vjuː/，类似于 `view`) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，`Vue` 被设计为可以自底向上层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

### 1.2、mvvm模式

    vue在和其他一些框架一样设计上也采用了MVVM(model - view -view -model)

![](https://ws1.sinaimg.cn/large/006rYhJMgy1g25m32s6ocj30p50e1tem.jpg)

### 1.3、Vue扣有什么不同

如果你使用过 jQ即可，那你一定对操作 DOM、绑定事件等这些原生 JavaScript 能力非常熟悉， 比如我们在指定 DOM 中插入一个元素，给它绑定一个点击事件：

```
if (showBtn) {
    var btn = $('<button>Click me</button>') ;
    btn.on ('click ', function () {
         console.log ('Clicked !'); 
    }); 
    $('#app').appeηd(btn); 
}
```

而 Vue.js 通过 MVVM 的模式拆分为视图与数据两部分，并将其分离。因此，你只需要关心你的数据即可， DOM 的事情 Vue 会帮你自动搞定，比如上面的示例用 Vue.js 可以改写为：

```
<body>
    <div id="app"> 
        <button v-if="showBtn" v-on:click="handleClick">Click me</button> 
    </div>
</body>
<script> 
    new Vue ({ 
        el :'#app', 
        data : { 
            showBtn: true 
        },
        methods: { 
            handleClick: function () { 
                console . log ( ' Clicked! '); 
            }
        }
    }) 
</script>
```

### 1.4、怎么使用vue ?

vuee是一个渐进式的 `JavaScript` 框架，根据项目需求，你可以选择从不同的维度来使用它。 如果你只是想体验 `Vue` 扣带来的快感或者开发几个简单的`HTML 5` 页面或小应用，你可以直接 通过 script 加载 CDN 文件，例如：


    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
或者

    <!-- 生产环境版本，优化了尺寸和速度 -->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

引用完成后在`<body>`标签后使用script来创建vue,示例:
```
<!doctype html>
<head>
<title>vue-demo<title/>
</head>
<body>
    <div id="#app">
    <p>
    {{msg}}
    </p>
    <input type="text" v-model="msg">
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
    new Vue({
        el : '',
        data（）{
            return{
                msg: 'Hello Vue ！'
            }
        }
    })
    </script>
<body/>
</html>
```
效果图：

![](https://ws1.sinaimg.cn/mw690/006rYhJMgy1g25n3z22ehj30kt03nglf.jpg)

