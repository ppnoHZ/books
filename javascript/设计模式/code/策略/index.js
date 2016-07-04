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
console.log(caculateBonus('S', 2000));
console.log(caculateBonus('A', 2000));





var tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    }, strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};

var Animate = function (dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
};

Animate.prototype.start = function (propertyName, endPos, duration, easing) {
    this.startTime = +new Date; // 􏲱􏲲􏳿􏲱􏳵􏳶动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 􏰰􏳳􏳹􏰇􏳸􏰞节点初始位置 
    this.propertyName = propertyName; //dom􏰰􏳳􏳼􏳽􏱦􏱈􏰦节点需要被改变的css属性名
    this.endPos = endPos; //dom􏰰􏳳􏱮􏳉􏳸􏰞 节点目标位置
    this.duration = duration; // 􏲱􏲲􏳔􏲺􏴁􏴂 动画持续事件
    this.easing = tween[easing]; // 􏱍􏲱􏰏􏰿缓动算法
    var self = this;
    var timeId = setInterval(function () { // 􏳿启动定时器，开始执行动画􏲱􏱀􏳵􏳕􏳷􏳴􏰇􏱰􏳲􏲱􏲲
        if (self.step() === false) { // 􏴃􏴄􏲱􏲲􏱥􏳺􏳻􏳷􏴅􏰨如果动画已结束，则清除定时器􏱙􏱀􏳵􏳕 
            clearInterval(timeId);
        }
    }, 19);
};
Animate.prototype.update = function (pos) {
    this.dom.style[this.propertyName] = pos + 'px';
};
Animate.prototype.step = function () {
    var t = +new Date;
    if (t >= this.startTime + this.duration) {
        this.update(this.endPos);
        return false;
    }
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    // ￼￼￼￼￼this.update(pos); //不知为何报错
    this.dom.style[this.propertyName] = pos + 'px';
};


var div = document.getElementById('div'); var animate = new Animate(div);
animate.start('left', 1500, 1000, 'strongEaseOut');
// animate.start( 'top', 1500, 500, 'strongEaseIn' );




/**
 * 表单验证
 */


var strategies = {
    isNonEmpty: function (value, errorMsg) {
        if (value === '') {
            return errorMsg
        }
    },
    minLength: function (varlue, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function (varlue, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
        }
    }
}


var Validator = function () {
    this.cache = [];
}
/**
 * 添加校验信息
 */
Validator.prototype.add = function (dom, rule, errorMsg) {
    var ary = rule.split(':'); //把 strategy和参数分开
    this.cache.push(function () { //把检验的步骤用空函数包装起来，放入cache
        var strategy = ary.shift();//用户挑选的strategy
        ary.unshift(dom.value);//把input的value家进参数列表
        ary.push(errorMsg);//添加errorMsg
        return strategies[strategy].apply(dom, ary);
    })
}

Validator.prototype.start = function () {
    for (var i = 0; validatorFunc; validataFunc = this.cache[i++]) {
        var msg = validataFunc();
        if (msg) {
            return msg;
        }
    }
}
var registerForm = document.getElementById('registerForm');

var validataFunc = function () {
    var validator = new Validator();
}


