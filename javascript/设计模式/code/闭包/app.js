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




var Tv = {
    open: function () {
        console.log('打开电视机');
    },
    close: function () {
        console.log('关闭电视机');
    }
}


var OpenTvCommand = function (receiver) {
    this.receiver = receiver;
}
OpenTvCommand.prototype.open = function () {
    this.receiver.open();
}
OpenTvCommand.prototype.close = function () {
    this.receiver.close();
}

//闭包实现
var createCommand = function (receiver) {
    var open = function () {
        return receiver.open();
    }

    var close = function () {
        return receiver.close();
    }
    return {
        open: open,
        close: close
    }
}

var setCommand = function (command) {
    document.getElementById('open').onclick = function () {
        command.open();
    }
    document.getElementById('close').onclick = function () {
        command.close();
    }
}

// setCommand(new OpenTvCommand(Tv));

//闭包实现
setCommand(createCommand(Tv));



//高阶函数
// 高阶函数是指至少满足下列条件之一的函数。
//  函数可以作为参数被传递;  函数可以作为返回值输出。


/**
 * 单例模式
 */
var getSingle = function (fn) {
    var ret;
    return function () {
        return ret || (ret = fn.apply(this, arguments))
    }
};
var getScript = getSingle(function () {
    return document.createElement('script')
});
var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2); //true


//AOP 面向切面编程，动态植入


Function.prototype.before = function (beforefn) {
    var __self = this; //保存原函数的引用
    return function () { //返回包含了原函数和新函数的代理函数
        beforefn.apply(this, arguments)
        return __self.apply(this.arguments)
    }
}

Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments)
        return ret;
    }
}

var func = function () {
    console.log(2);
}

func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
})
console.log(func);

func();//TODO 有点不懂


// currying 1
var cost = (function () {
    var args = [];

    return function () {
        if (arguments.length === 0) {
            var money = 0;
            for (var i = 0; i < args.length; i++) {
                money += args[i];
            }
            return money;
        } else {

            [].push.apply(args, arguments);
        }
    }
})();

cost(100)
cost(100)
cost(100)
console.log(cost());

// currying 2
var currying = function (fn) {
    var args = [];

    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);

            return arguments.callee
        }
    }
}

var cost = (function () {
    var money = 0;
    return function () {
        for (var i = 0; i < arguments.length; i++) {
            money += arguments[i];
        }
        return money;
    }
})()

var cost = currying(cost);

cost(100)
cost(100)
cost(600)
console.log(cost())


//函数节流

var throttle = function (fn, interval) {
    var __self = fn, timer, firstTime = true;

    return function () {
        var args = arguments,
            __me = this;

        if (firstTime) {
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500)

    }
}

window.onresize = throttle(function () {
    console.log(1);
}, 500)


// 分时函数

var timeChunk = function (ary, fn, count) {
    var obj, t;

    var len = ary.length

    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    }

    return function () {
        t = setInterval(function () {
            if (ary.length === 0) { //如果全部节点都创建好了。
                return clearInterval(t);
            }
            start();
        }, 200)
    }
}

var ary = []
for (var i = 1; i <= 1000; i++) {
    ary.push(i);
}

var renderFriendList = timeChunk(ary, function (n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
},8)
//renderFriendList();