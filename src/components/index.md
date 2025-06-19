# 更好的 Unicode 支持

早期，由于存储空间宝贵，Unicode 使用 16 位二进制来存储文字。我们将一个 16 位的二进制编码叫做一个码元（Code Unit）。

后来，由于技术的发展，Unicode 对文字编码进行了扩展，将某些文字扩展到了 32 位（占用两个码元），并且，将某个文字对应的二进制数字叫做码点（Code Point）。

ES6 为了解决这个困扰，为字符串提供了方法：codePointAt，根据字符串码元的位置得到其码点。

同时，ES6 为正则表达式添加了一个 flag: u，如果添加了该配置，则匹配时，使用码点匹配

```js
const text = "𠮷"; //占用了两个码元（32位）

console.log("字符串长度：", text.length);
console.log("使用正则测试：", /^.$/u.test(text));
console.log("得到第一个码元：", text.charCodeAt(0));
console.log("得到第二个码元：", text.charCodeAt(1));

//𠮷：\ud842\udfb7
console.log("得到第一个码点：", text.codePointAt(0));
console.log("得到第二个码点：", text.codePointAt(1));

/**
 * 判断字符串char，是32位，还是16位
 * @param {*} char
 */
function is32bit(char, i) {
  //如果码点大于了16位二进制的最大值，则其是32位的
  return char.codePointAt(i) > 0xffff;
}

/**
 * 得到一个字符串码点的真实长度
 * @param {*} str
 */
function getLengthOfCodePoint(str) {
  var len = 0;
  for (let i = 0; i < str.length; i++) {
    //i在索引码元
    if (is32bit(str, i)) {
      //当前字符串，在i这个位置，占用了两个码元
      i++;
    }
    len++;
  }
  return len;
}

console.log("𠮷是否是32位的：", is32bit("𠮷", 0));
console.log("ab𠮷ab的码点长度：", getLengthOfCodePoint("ab𠮷ab"));
```

# 更多的字符串 API

以下均为字符串的实例（原型）方法

- includes

```js
includes(要匹配的字符串, 从下标几开始);
```

判断字符串中是否包含指定的子字符串

- startsWith

判断字符串中是否以指定的字符串开始

- endsWith

判断字符串中是否以指定的字符串结尾

```js
startsWith(要匹配的字符串, 从下标几开始);
endsWith(要匹配的字符串, 从下标几开始);
```

- repeat

将字符串重复指定的次数，然后返回一个新字符串。

```js
const txt = ‘你好’
txt.repeat(3) // '你好你好你好
```

# 模板字符串

ES6 之前处理字符串繁琐的两个方面：

1. 多行字符串
2. 字符串拼接

在 ES6 中，提供了模板字符串的书写，可以非常方便的换行和拼接，要做的，仅仅是将字符串的开始或结尾改为 ` 符号

如果要在字符串中拼接 js 表达式，只需要在模板字符串中使用

```js
${JS表达式}
```

# [扩展]模板字符串标记

在模板字符串书写之前，可以加上标记:

以前在字符串中为了避免\n 转义，前面再加一个\，现在的写法是：

```js
var text = String.raw`abc\t\nbcd`;
console.log(text);
```

```js
标记名`模板字符串`;
```

标记是一个函数，函数参数如下：

1. 参数 1：被插值分割的字符串数组
2. 后续参数：所有的插值

```js
var love1 = "秋葵";
var love2 = "香菜";

var text = myTag`小明喜欢${love1}，也喜欢${love2}。`;

//相当于：
// text = myTag(["小明喜欢", "，也喜欢", "。"], "秋葵", "香菜")

function myTag(parts) {
  const values = Array.prototype.slice.apply(arguments).slice(1);
  let str = "";
  for (let i = 0; i < values.length; i++) {
    str += `${parts[i]}：${values[i]}`;
    if (i === values.length - 1) {
      str += parts[i + 1];
    }
  }
  return str;
}

console.log(text);
```
