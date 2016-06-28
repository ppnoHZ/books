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
    var agrs = Array.prototype.joni.call(arguments, ',');

}