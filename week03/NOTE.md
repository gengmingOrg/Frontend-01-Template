# 每周总结可以写在这里
根据课上老师的示范，找出 JavaScript 标准里所有的对象，
分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。

宿主对象（host Objects）：
  由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。
  宿主环境： 例如 node、浏览器提供的对象
  浏览器提供的对象：
    window是一个全局对象 上面挂载了很多属性。宿主还提供了一些构造器：例如 new Image
    很多的全局函数 都是挂载这上面的 例如: console 对象
  Node 提供的对象：
    global是全局对象
以上是宿主提供的对象，找出 JavaScript 标准里所有的对象，
内置对象（Built-in Objects）：
  由 JavaScript 语言提供的对象。
  固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。

  原生对象（Native Objects）：
    可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
    就是可以自己创建的对象。

  普通对象（Ordinary Objects）：由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

几乎所有这些构造器的能力都是无法用纯 JavaScript 代码实现的，它们也无法用 class/extend 语法来继承。这些构造器创建的对象多数使用了私有字段

三个值：
Infinity、NaN、undefined。
九个函数：eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent
一些构造器：Array、Date、RegExp、Promise、Proxy、Map、WeakMap、Set、WeakSet、Function、Boolean、String、Number、Symbol、Object、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、ArrayBuffer、SharedArrayBuffer、DataView、Typed Array、Float32Array、Float64Array、Int8Array、Int16Array、Int32Array、UInt8Array、UInt16Array、UInt32Array、UInt8ClampedArray。四个用于当作命名空间的对象：Atomics JSON Math Reflect
