var func = function () {
    var a = 1;
    return function () {
        a++;
        console.log(a);
    }
}

var f = func();

f();//2
f();//3


var nodes = document.getElementsByTagName('div');
for (var i = 0; i < nodes.length; i++) {
    // nodes[i].onclick = function () {
    //     console.log(i); // 5
    // }

    //闭包
    (function (i) {
        nodes[i].onclick = function () {
            console.log(i); // 0,1,2,3,4,
        }
    })(i)
}


var Type = {}


for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function (type) {
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    })(type)
}
console.log(Type.isArray([]));


/**
 * 封装变量
 */

var cache = {}
var mult = function () {
    var args = Array.prototype.join.call(arguments, ',');
    //将参数组合成字符串作为主键，缓存
    if (cache[args]) {
        return cache[args]
    }

    var a = 1;
    for (var i = 0; i < arguments.length; i++) {
        a = a * arguments[i];
    }
    return cache[args] = a
}

console.log(mult(1, 2, 3));  //6

console.log(mult(1, 2, 3)); //6

//用闭包封装缓存变量
var mult = (function () {
    var cache = {}
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args]
        }

        var a = 1;
        for (var i = 0; i < arguments.length; i++) {
            a = a * arguments[i];
        }
        return cache[args] = a
    }
})()

console.log(mult(1, 2, 3));  //6

console.log(mult(1, 2, 3)); //6



//封装计算函数

var mult = (function () {
    var cache = {}
    var calculate = function () {
        console.log(arguments);
        var a = 1;
        for (var i = 0; i < arguments.length; i++) {
            a = a * arguments[i];
        }
        return a
    }


    return function () {
        var args = Array.prototype.join.call(arguments, ',')
        if (args in cache) {
            return cache[args]
        }
        // calculate(arguments) 这里不能使用 这种方式，因为传过去之后以数组的形式传递进去的
        return cache[args] = calculate.apply(null, arguments)
    }
})()
console.log(mult(1, 2, 3));  //6

console.log(mult(1, 2, 3)); //6



/**
 * 闭包和面向对象
 */

//闭包实现
var extent = function () {
    var value = 0;
    return {
        call: function () {
            value++;
            console.log(value);
        }
    }
}

var extent = new extent();
extent.call(); //1
extent.call();//2
extent.call();//3

//面向对象
var extent = {
    value: 0,
    call: function () {
        this.value++;
        console.log(this.value);
    }
}
extent.call()
extent.call()
extent.call()


//
var Extent = function () {
    this.value = 0
}
Extent.prototype.call = function () {
    this.value++;
    console.log(this.value);
}

var extent = new Extent();

extent.call()
extent.call()
extent.call()