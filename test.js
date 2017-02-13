/**
 * Created by pc on 2016/8/22.
 */
[1,2,3].map(x=>x*x);
var num=Math.random();
console.log(`the number is ${num}`);
var someArray = [ "a", "b", "c" ];
for (v of someArray) {
    console.log(v);//输出 a,b,c
}
for (let i=0;i<2;i++)
    console.log(i)

function sayHello2(name='dude'){
    console.log(`Hello ${name}`);
}

function add(...x){
    return x.reduce((m,n)=>m+n);
}
//传递数组参数，自动映射到函数的参数。
//set和map函数类
//set:add,has,size
//map,有set,和get函数
//module point from "/point.js";
//import Point from "point";
//
//var origin = new Point(0, 0);
//console.log(origin);

// point.js
//module "point" {
//export class Point {
//        constructor (x, y) {
//            public x = x;
//            public y = y;
//        }
//    }
//}
//运用ES6的默认参数
//function sayHello2(name='dude'){
//    console.log(`Hello ${name}`);
//}
////定义被侦听的目标对象
//var engineer = { name: 'Joe Sixpack', salary: 50 };
////定义处理程序
//var interceptor = {
//    set: function (receiver, property, value) {
//        console.log(property, 'is changed to', value);
//        receiver[property] = value;
//    }
//};
////创建代理以进行侦听
//engineer = Proxy(engineer, interceptor);
////做一些改动来触发代理
//engineer.salary = 60;//控制台输出：salary is changed to 60

//class Animal {
//    //ES6中新型构造器
//    constructor(name) {
//        this.name = name;
//    }
//    //实例方法
//    sayName() {
//        console.log('My name is '+this.name);
//    }
//}
////类的继承
//class Programmer extends Animal {
//    constructor(name) {
//        //直接调用父类构造器进行初始化
//        super(name);
//    }
//    program() {
//        console.log("I'm coding...");
//    }
//}
////测试我们的类
//var animal=new Animal('dummy'),
//    wayou=new Programmer('wayou');
//animal.sayName();//输出 ‘My name is dummy’
//wayou.sayName();//输出 ‘My name is wayou’
//wayou.program();//输出 ‘I'm coding...’,