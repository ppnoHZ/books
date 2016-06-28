//1，this 作为对象的方法调用，this指向该对象
var obj = {
    a: 1,
    getA: function () {
        console.log(this === obj); //true
        console.log(this.a); //1
    }
}
obj.getA();

console.log('--------作为普通函数调用----------')
//2，作为普通函数调用，this总是指向全局对象，浏览器中指向window对象
window.name = 'globalName';

var getName = function () {
    return this.name
}
console.log(getName()) //globalName

//或者从对象中取出方法，以普通方法的形式调用
var myObject = {
    name: 'sven',
    getName: function () {
        return this.name
    }
}
var get = myObject.getName;
console.log(get()); //普通函数调用，globalName

window.id = 'window_id';

document.getElementById('div1').onclick = function () {
    console.log(this.id); //div1
    var callback = function () {
        console.log(this.id); //window_id  普通函数的调用，所有this指向了window
    }

    callback(); //普通函数的调用，所有this指向了window
}

document.getElementById('div2').onclick = function () {
    var that = this; //存储 this引用
    var callback = function () {
        console.log(that.id); //div  
    }

    callback();
}

/*
*3,构造器调用
*/
console.log('--------构造器调用----------')
var myClass = function () {
    this.name = 'sven'
}
var obj = new myClass();
console.log(obj.name)

var myClass1 = function () {
    this.name = 'sven'
    return {
        name: "anne"
    }
    //显式返回一个对象 字this 指向返回的对象
}
obj = new myClass1();
console.log(obj.name);// anne 


/**
 * call apply
 */

document.getElementById = (function (func) {
    return function () {
        return func.apply(document, arguments);
    }
})(document.getElementById);

var getId = document.getElementById;

var div = getId('div1')
console.log(div.id)

/**
 * call 和apply 的不同
 * 当 第一个参数传null的时候，函数体内的this指向window
 * 严格模式下this执行null
 */
var func = function (a, b, c) {
    "use strict";

    console.log('window', this === window);
    console.log('null', this === null);
    console.log([a, b, c]);
}

func.apply(null, [1, 2, 3]); //apply 函数参数以数组的形式传入,和func的形参一一对应

func.call(null, 1, 2, 3);//call  参数不固定，参数顺序一一对应


/**
 * call 和 apply的用途
 */
//1 改变this指向

var obj1 = {
    name: 'sven'
}
var obj2 = {
    name: 'anne'
}

window.name = 'window'

var getName = function () {
    console.log(this.name);
}//.bind(obj1) //可以使用bind对当前方法进行this绑定，bind之后的所有其他call apply都无效

getName(); //window
getName.call(obj1) //sven
getName.call(obj2) //anne

/**
 *  bind(obj1)
 *  
 */




