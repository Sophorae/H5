# 1.简介
JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。为了寻找JavaScript代码错误通常需要在执行过程中不断调试。像ESLint这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。为了便于人们使用，ESLint 内置了一些规则，也可以在使用过程中自定义规则。

ESLint 使用 Node.js 编写，这样既可以有一个快速的运行环境的同时也便于安装。
### 所有都是可拔插的

* 内置规则和自定义规则共用一套规则 API 
* 内置的格式化方法和自定义的格式化方法共用一套格式化 API
* 额外的规则和格式化方法能够在运行时指定
* 规则和对应的格式化方法并不强制捆绑使用

#### 每条规则:

* 各自独立
* 可以开启或关闭（没有什么可以被认为“太重要所以不能关闭”）
* 可以将结果设置成警告或者错误  

#### 另外:

* ESLint 并不推荐任何编码风格，规则是自由的
* 所有内置规则都是泛化的（？）

### 配置：可以通过以下三种方式配置 ESLint:

* 使用 .eslintrc 文件；
* 在 package.json 中添加 eslintConfig 配置块；
* 直接在代码文件中定义。

# 2.使用
### 安装
```
$ npm install -g eslint
```
### 新建一个index.js文件
```
function fn(arr){
    for(var i in arr){
        console.log(i);
    }
}
var arr = [22,44,53324,456456];
fn(arr);
```
然后在命令行执行node index.js确保它是可以正确运行的（输出结果为*22 44 53324 456456*）。
### 添加配置文件
新建ESLint配置文件.eslintrc.js：
```
module.exports = {
  extends: 'eslint:recommended',
};
```
> 值为 "eslint:recommended" 的 extends 属性启用一系列核心规则，这些规则报告一些常见问题

### 接着我们执行以下命令来使用ESLint检查：
```
$ eslint index.js
```
可以看到输出了一个错误：
```
$ eslint index.js

E:\test\index.js
  2:15  error  Parsing error: Unexpected token of

✖ 1 problem (1 error, 0 warnings)

```
这个错误是因为，`for-of`是es6功能，默认情况下，ESLint 支持 ECMAScript 5 语法。我们可以通过以下设置，支持 ES6 全局变量支持:
```
{
    "env": {
        "es6": true
    }
}
```
然后再执行`eslint index.js`
```
$ eslint index.js

E:\test\index.js
  3:9  error  Unexpected console statement  no-console
  3:9  error  'console' is not defined      no-undef

✖ 2 problems (2 errors, 0 warnings)

```
可以看到有两个错误，含义分别是：  
**no-console**--	 禁用`console`  
**no-undef**--  禁用未声明的变量
如果禁用这两个规则，则代码检测便可以通过  
## 3.配置  
### 解析器选项  
* `ecmaVersion` - 默认设置为5， 你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定
* `sourceType` - 设置为 "script" (默认) 或 "module"
* `ecmaFeatures` - 这是个对象，表示你想使用的额外的语言特性:
    * `globalReturn` - 允许在全局作用域下使用 return 语句
    * `impliedStrict` - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
    * `jsx` - 启用 JSX
    * `experimentalObjectRestSpread` - 启用实验性的 object rest/spread properties 支持。  
例子：  
```
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    }
}
```
参考链接：[eslint规则列表](http://eslint.cn/docs/rules/)