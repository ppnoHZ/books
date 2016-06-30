// 实现单例模式
var Singleton = function (name) {
    this.name = name;
    this.instance = null;
}
//实例方法
Singleton.prototype.getName = function () {
    console.log(this.name);
}

//静态方法
Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}

var a = Singleton.getInstance("sven1")
var b = Singleton.getInstance("sven1") //调用静态方法

a.getName();

console.log(a === b);

/**
 * 实现方式2
 */

var Singleton = function (name) {
    this.name = name
}
Singleton.prototype.getName = function () {
    console.log(this.name);
}
Singleton.getInstance = (function () {
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})()

var a = Singleton.getInstance("sven1")
var b = Singleton.getInstance("sven1") //调用静态方法

a.getName();

console.log(a === b);


//使用代理的方式实现单例模式

//好处是  CreateDiv变成了普通类
var CreateDiv = function (html) {
    this.html = html
    this.init();
}

CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html
    document.body.appendChild(div);
}

//单例的逻辑移到代理类
var ProxySingleCreateDiv = (function () {
    var instance;

    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }
        return instance;
    }
})();

var a = new ProxySingleCreateDiv('sven1');
var b = new ProxySingleCreateDiv('sven1');

console.log(a === b);


//通用的单例生成器
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}

var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};
var createSingleLoginLayer = getSingle( createLoginLayer );

document.getElementById('loginBtn1').onclick = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};

var createSingleIframe = getSingle(function () {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
});
document.getElementById('loginBtn2').onclick = function () {
    var loginLayer = createSingleIframe();
    loginLayer.src = 'http://baidu.com';
};