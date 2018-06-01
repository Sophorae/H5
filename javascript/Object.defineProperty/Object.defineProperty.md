#### Obejct.defineproperty()方法
> 该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。 

##### 语法
```
Obejct.defineProperty(obj, prop, descriptor)
```
##### 参数
> obj：要在其上定义属性的对象。<br>
> prop：要定义或者修改的属性的名称。<br>
> descriptor： 将被定义或者修改的属性描述符。

##### 返回值
> 被传递给函数的对象

**在ES6中，由于 Symbol类型的特殊性，用Symbol类型的值来做对象的key与常规的定义或修改不同，而Object.defineProperty 是定义key为Symbol的属性的方法之一。**
#### 属性描述符
对象目前存在的属性描述符两种形式：**数据描述符** 和 **存取描述符**。
> 数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。<br>
> 存取描述符是由getter-setter函数对描述的属性。

描述符必须是这两种形式之一，不能同时是两者————原因： 数据描述符的value和存取描述符的set和get方法是矛盾的。

#### 数据描述符和存取描述符均具有以下可选键值：

##### configurable

> 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。**默认为 false**。

##### enumerable
> 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。**默认为 false**。

#### 数据描述符具有以下可选键值：

##### value
> 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。**默认为 undefined**。

##### writable
> 当且仅当该属性的writable为true时，value才能被赋值运算符改变。**默认为 false**。

||| **数据描述符构成** |||
|:---|:---|:---|:---|:---|:---|
||属性|值类型|默认值|含义|
|数据|value|任意类型|undefined|	基本的“键/值”|
||writable|Boolean|false|属性可否重写，默认只读|
|性质|enumerable|Boolean|false|属性可否枚举，默认不能被for…in枚举|
||configurable|Boolean|false|属性可否能被重新配置，默认writable和enumerable可修改，且可用delete删除。|
#### 存取描述符具有以下可选键值：

##### get
> 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。**默认为 undefined**。

##### set
> 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。**默认为 undefined**。

||| **存取描述符构成** |||
|:---|:---|:---|:---|:---|:---|
||属性|值类型|默认值|含义|
|数据|get|Function|undefined|取值函数getter|
||set|Function|undefined|设值函数|
|性质|enumerable|Boolean|false|属性可否枚举，默认不能被for…in枚举|
||configurable|Boolean|false|属性可否能被重新配置，默认writable和enumerable可修改，且可用delete删除。|

**如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。**

对象的属性描述符不一定来自于自身，继承来的也要考虑。

```javascript
// -->隐式
var obj = {};var descriptor = Object.create(null); // 没有继承的属性，默认没有 enumerable，没有 configurable，没有 writable
descriptor.value = 'static';
Object.defineProperty(obj, 'key', descriptor);

// -->显式
Object.defineProperty(obj, "key", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: "static"
});
```

**如果属性已经存在，Object.defineProperty()将尝试根据描述符中的值以及对象当前的配置来修改这个属性。如果旧描述符将其configurable 属性设置为false，则该属性被认为是“不可配置的”，并且没有属性可以被改变（除了单向改变 writable 为 false）。当属性不可配置时，不能在数据和访问器属性类型之间切换。 当试图改变不可配置属性（除了writable 属性之外）的值时会抛出错误，除非当前值和新值相同。**

#### Writable 特性

> **当writable属性设置为false时，该属性被称为“不可写”。它不能被重新分配。**

```javascript
var obj = {}; // Creates a new object

Object.defineProperty(obj, 'a', {
    value: 37,
    writable: false // 不可写
});

console.log(obj.a); // 37
obj.a = 25; //不会抛出异常
console.log(obj.a); // 37

Object.defineProperty(obj, 'a', {
    value: 37,
    writable: true // 可写
});

console.log(obj.a); // 37
obj.a = 25; //不会抛出异常
console.log(obj.a); // 25
```
#### Enumerable 特性

> **enumerable定义了对象的属性是否可以在 for...in循环和  Object.keys()中被枚举。**

```javascript
var obj = {};
Object.defineProperty(obj, "a", { value : 1, enumerable:true });
Object.defineProperty(obj, "b", { value : 2, enumerable:false });
Object.defineProperty(obj, "c", { value : 3 }); // enumerable defaults to false
obj.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

for (var i in obj) {
console.log(i);
}// 打印 'a' 和 'd' (in undefined order)

Object.keys(obj); // ["a", "d"]

obj.propertyIsEnumerable('a'); // true
obj.propertyIsEnumerable('b'); // false
obj.propertyIsEnumerable('c'); // false
```
#### Configurable 特性

> **configurable特性表示对象的属性是否可以被删除，以及除writable特性可以从true转为false外的其他特性是否可以被修改。**

```javascript
var obj = {};
Object.defineProperty(obj, "a", {
    get : function() {return 1;},
    configurable : false
});

// throws a TypeError
Object.defineProperty(obj, "a", {configurable : true});
// throws a TypeError
Object.defineProperty(obj, "a", {enumerable : true});
// throws a TypeError (set was undefined previously)
Object.defineProperty(obj, "a", {set : function(){}});
// throws a TypeError (even though the new get does exactly the same thing)
Object.defineProperty(obj, "a", {get : function(){return 1;}});// throws a TypeError
Object.defineProperty(obj, "a", {value : 12});

console.log(obj.a); // 1
delete obj.a; // Nothing happens
console.log(obj.a); // 1
```
#### Settter和Getters

```javascript
var obj = {};

Object.defineProperty(o, "b", {
get : function(){
return value;
},
set : function(newValue){
value = newValue;
},
enumerable : true,
configurable : true});

obj.b = 38;// 对象obj拥有了属性b，值为38
```

Object.defineProperty 与 Object.prototype 的区别：
> Object.prototype指的是Object的原型对象，其创建的对象的prototype继承于原型链上的prototype，有些属性可能被覆盖，这种机制改变Object原型，会通过原型链，而改变所有对象；除非这些属性和方法被其他对原型链更里层的改动所覆盖。这提供了一个非常强大的、但有潜在危险的机制，来覆盖或扩展对象行为。<br>
> Object.defineProperty值得是声明自身对象属性的修饰。

**焦富明** ***2018-5-30*** [引用Object.defineProperty() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)