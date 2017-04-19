# tryGet.js

Get property without breaking Error

# 用途 

假设有一个对象obj，在不知道obj键值情况的条件下，想要获取obj.k1.k2

不能直接写 console.log( obj.k1.k2 );  因为如果k1不存在的话就报错了

一般都需要写成 console.log( obj.k1 && obj.k1.k2 );   要先确认层级的存在才能进行获取操作

但是如果层级很深很深，比如obj.k1.k2.k3.k4.k5.k6.k7.k8(相当极端的情况) ，那在这种条件下进行获取就会非常痛苦

我写了一个tryGet 用来解除这种痛苦，比如上面这种极端情况，可以写成 tryGet(obj, 'k1.k2.k3.k4.k5.k6.k7.k8');

如果确实存在这个路径，那就能正确获取到对应的值，路径上任意一层出错，都会返回undefined，并且不会报错

# 2017-04-18 新增 tryRun 函数

和tryGet类似，不同之处是用来运行函数的

# 用法 Usage

不会写测试用例，以下就是随随便便的测试用例 >_<, 也是用法示例

```javascript
var obj = {
    key1: {
        'key:2': {
            'key.3': {
                'key...6': 666,
            },
            'key#4': 4,
            'key@5': 'test key 5',
            fn1: function() {
                return 'fn1';
            }
        }
    },
    fn2: function() {
        return 'fn2';
    },
    fn3: function(word) {
        return word;
    }
};

console.log(
    tryGet(obj.key1, 'key:2.key#4'),   //4
    tryGet(obj.key1, 'key:2.key#4.unknowKey.unknowKey.unknowKey'),   //undefined
    
    //tryGet 允许默认值，位置在第三参数
    tryGet(obj.unknowKey, 'key:2.key#4', 'not found'),   //"not found"
    tryGet(window.unknowObj, 'key:2.key#4'),   //undefined
    tryGet(obj.key1, 'key:2.key@5'),   //"test key 5"
    tryGet(obj.key1, ['key:2', 'key@5']),   //"test key 5"
    tryGet(obj.key1, ['key:2', 'key.3', 'key...6']),   //666
    tryGet(obj.key1, ['key:2', 'key.3', 'key...6', 'unknowKey'], 'not found'),  //"not found"
    tryGet(obj.unknowKey, ['key:2', 'key.3', 'key...6']),   //undefined
    tryGet(window.unknowObj, ['key:2', 'key.3', 'key...6']),   //undefined

    tryRun(obj, 'fn2'),   //"fn2"
    tryRun(obj, 'key1.key:2.fn1'),   //"fn1"
    tryRun(window.unknowObj, 'key1.key:2.fn1'),   //undefined
    

    //tryRun 允许传参
    tryRun(obj, 'fn3', ['hello'])   //"hello"
);
```
