/**
 * 
 * 定义一系列的算法，把他们一个个封装起来，并且使他们可以互相替换
 */


var performanceS = function () { };

performanceS.prototype.calculate = function (salary) {
    return salary * 4
}

var performanceA = function () { };

performanceA.prototype.calculate = function (salary) {
    return salary * 3;
}

var Bonus = function () {
    this.salary = null; //原始工资
    this.strategy = null; //绩效等级对应的策略对象
}

Bonus.prototype.setSalary = function (salary) {
    this.salary = salary //设置员工的原始工资
}
Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy //设置员工绩效等级对应的策略对象
}
Bonus.prototype.getBonus = function () {
    return this.strategy.calculate(this.salary)//把计算奖金的操作委托给对应的策略对象
}

var bonus = new Bonus();

bonus.setSalary(1000);
bonus.setStrategy(new performanceS());

console.log(bonus.getBonus());

bonus.setStrategy(new performanceA())

console.log(bonus.getBonus());


var strategies = {
    'S': function (salary) {
        return salary * 4
    },
    'A': function (salary) {
        return salary * 3
    }
}

var caculateBonus = function (level, salary) {
    return strategies[level](salary);
}
console.log(caculateBonus('S',2000));
console.log(caculateBonus('A',2000));
