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
var b = Singleton.getInstance("sven1")

a.getName();

console.log(a === b);