# 1.简介
JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。为了寻找JavaScript代码错误通常需要在执行过程中不断调试。像ESLint这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。为了便于人们使用，ESLint 内置了一些规则，也可以在使用过程中自定义规则。

ESLint 使用 Node.js 编写，这样既可以有一个快速的运行环境的同时也便于安装。

#### 每条规则:

* 各自独立
* 可以开启或关闭（没有什么可以被认为“太重要所以不能关闭”）
* 可以将结果设置成警告或者错误  

#### 另外:

* ESLint 并不推荐任何编码风格，规则是自由的
* 所有内置规则都是泛化的（？）

### 配置：可以通过以下三种方式配置 ESLint:

* 使用 .eslintrc 文件(ESLint 将自动在要检测的文件目录里寻找它们，紧接着是父级目录，一直到文件系统的根目录（除非指定 root: true）)；
* 在 package.json 中添加 eslintConfig 配置块；
* 直接在代码文件中定义。  
如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

1. `.eslintrc.js`
2. `.eslintrc.yaml`
3. `.eslintrc.yml`
4. `.eslintrc.json`
5. `.eslintrc`
6. `package.json`

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
### extends  
* plugin:(插件 是一个 npm 包，通常输出规则,比如：plugin:react/recommended)
* 包名 (可共享的配置是一个 npm 包，它输出一个配置对象，可以省略前缀，比如，react)
* /(可以引用基本配置文件的绝对路径或相对路径。)  
* 配置名称 (比如 eslint:recommended，eslint:all)  

文件示例：
```
{
    "plugins": [
        "react"
    ],
    "extends": [
        "plugin:react/recommended",
        "myconfig",
        "./node_modules/coding-standard/eslintDefaults.js",
        "eslint:recommended"
    ],
    ...
}
```
### 解析器选项  
* `ecmaVersion` - 默认设置为5， 你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定
* `sourceType` - 设置为 "script" (默认) 或 "module"
* `ecmaFeatures` - 这是个对象，表示你想使用的额外的语言特性:
    * `globalReturn` - 允许在全局作用域下使用 return 语句
    * `impliedStrict` - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
    * `jsx` - 启用 JSX  

`.eslintrc.json` 文件示例：  
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
### 环境变量env
定义运行环境，browser，node，es6等等，可以同时定义多个。  
要在你的 JavaScript 文件中使用注释来指定环境，格式如下：
```
/* eslint-env node, es6 */
```  
文件示例：  
```
{
    "env": {
        "browser": true,
        "node": true
    }
}
```  
### 全局变量Globals  
当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。如果你想在一个源文件里使用全局变量，在配置中定义这些全局变量，就不会发出警告。  
将变量设置为 true 将允许变量被重写，或 false 将不允许被重写  
```
{
    "globals": {
        "var1": true,
        "var2": false
    }
}
```  
### 规则  
* "off" 或 0 - 关闭规则
* "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
* "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
* 有些规则还带有可选的参数，比如comma-dangle可以写成`[ "error", "always-multiline" ]`。

### 其他  
1. 可以在你的文件中使用以下格式的块注释来临时禁止规则出现警告：  
    ```
    /* eslint-disable */
    
    alert('foo');
    
    /* eslint-enable */
    ```  
上面代码临时禁止了no-alert规则发出警告

2. 当 ESLint 运行时，在确定哪些文件要检测之前，它会在当前工作目录中查找一个 .eslintignore 文件。如果发现了这个文件，当遍历目录时，将会应用这些偏好设置(忽略模式同 .gitignore 规范)。  
    
    例如，以下将忽略所有的 JavaScript 文件：
    ```
    **/*.js
    ```  
## 4.gulp-eslint  
#### 安装  
```
npm install gulp-eslint
```  
#### 使用  
    
    ```
    const eslint = require('gulp-eslint');
    
    gulp.task('so:js', function () {
        return gulp.src(['./src/js/header.js','./src/js/buy-car.js'])
    		.pipe(eslint())
    		.pipe(eslint.result(result => {
    			console.log(result.messages)
    		}))
    		.pipe(eslint.failOnError())
            .pipe(concat('buy-car.js'))
            .pipe(uglify())
            .pipe(rename({suffix:'.min'}))
            .pipe(gulp.dest('./src/js/'))
    });
    ```  
`eslint.result(action)` - 对检测结果进行处理  
`eslint.failOnError()` - 发现错误时终止进程  

参考链接：  
[eslint规则列表](http://eslint.cn/docs/rules/)  
[gulp-eslint](https://github.com/adametry/gulp-eslint)