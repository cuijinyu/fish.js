function Fish () {}
Fish.prototype.forEach = (array, fn) => {
    for (let i = 0;i < array.length; i++)
        fn(array[i]);
};

Fish.prototype.forEachObject = (obj, fn) => {
    for (let property of obj) {
        if (obj.hasOwnProperty(property))
            fn(property, obj[property]);
    }
};

Fish.prototype.map = (array, fn) => {
    let result = [];
    for (let i = 0;i < array.length; i++)
        result.push(fn(array[i]));
    return result;
};

Fish.prototype.reduce = (array, fn, initNum) => {
    let acc;
    if (initNum === undefined) 
        acc = array[0];
    else 
        acc = initNum;
    if (initNum === undefined)
        for (let i = 1;i < array.length; i++)
            acc = fn(acc, array[i]);
    else
        for (let value of array)
            acc = fn(acc, value);
    return [acc];
};

Fish.prototype.unless = (predicate, fn) => {
    if (!predicate)
        fn();
};

Fish.prototype.times = (time, fn) => {
    for (let i = 0;i < time; i++)
        fn(i);
};

Fish.prototype.every = (array, fn) => {
    let flag = true;
    for (let i = 0;i < array.length;i ++)
        flag = true && fn(array[i]);
    return flag;
};

Fish.prototype.some = (array, fn) => {
    let flag = false;
    for (let i = 0;i < array.length;i ++)
        flag = false || fn(array[i]);
    return flag;
};

Fish.prototype.tap = value => (func) =>(typeof func === "function" && func(value),console.log(value));

Fish.prototype.fliter = (array, fn) => {
    let result = [];
    for (let i = 0;i < array.length; i++)
        fn(array[i])?result.push(array[i]):undefined;
    return result;
};

Fish.prototype.zip = (leftArr, rightArr, fn) => {
    let result = [];
    for (let i = 0;i < Math.min(leftArr.length,rightArr.length); i++) {
        result.push(fn(leftArr[i], rightArr[i]));
    }
    return result;
};

Fish.prototype.unary = (fn) => fn.length === 1?fn:(arg) => fn(arg);

Fish.prototype.once = (fn) => {
    let flag = false;
    return () => {
        if (flag)
            return undefined;
        else {
            flag = !flag;
            return fn.apply(this, arguments);
        }
    }
};

/**
 * 记忆函数
 * @param fn
 * @returns {function(*=): *}
 */
Fish.prototype.memorized = (fn) => {
    let memoryTable = [];
    return (arg) => memoryTable[arg] || (memoryTable[arg] = fn(arg));
};

/**
 * 函数柯里化
 * @param fn
 * @returns {curriedFn}
 */
Fish.prototype.curry = (fn) => {
    if (typeof fn !== 'function')
        throw Error("fn is not a function");
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function () {
                return curriedFn.apply(this, args.concat([].slice.call(arguments)));
            }
        }
        return fn.apply(null, args);
    }
};

/**
 * 偏函数
 * @param fn
 * @param particalArgs
 * @returns {function(...[*])}
 */
Fish.prototype.partical = (fn, ...particalArgs) => {
  let args = particalArgs;
  return (...fullArguments) => {
      let arg = 0;
      for (let i = 0;i < args.length && arg < fullArguments.length;i ++) {
          if (args[i] === undefined) {
              args[i] = fullArguments[arg++];
          }
      }
      return fn.apply(null, args);
  }
};


Fish.prototype.compose = (...fns) => value => Fish.prototype.reduce(fns.reverse(), (acc, fn) => fn(acc), value);

Fish.prototype.pipe = (...fns) => value => Fish.prototype.reduce(fns, (acc, fn) => fn(acc), value);

/**
 * Continer 函子
 * @param {*} val
 */
Fish.prototype.Continer = function (val) {
    this.value = val;
};

Fish.prototype.Continer.of = function (val) {
    return new Fish.prototype.Continer(val);
};

/**
 * maybe 函子
 * @param {*} val
 */
Fish.prototype.Maybe = function (val) {
    this.value = val;
};

Fish.prototype.Maybe.of = function (val) {
    return new Fish.prototype.Maybe(val);
};

Fish.prototype.Maybe.prototype.isNothing = function () {
    return (this.value === undefined || this.value === null);
};

Fish.prototype.Maybe.prototype.map = function (fn) {
    return this.isNothing()?Fish.prototype.Maybe.of(null):Fish.prototype.Maybe.of(fn(this.value));
};

Fish.prototype.Maybe.prototype.join = function () {
    return this.isNothing()?Fish.prototype.Maybe.of(null):this.value;
};

Fish.prototype.Maybe.prototype.chain = function (f) {
    return this.map(f).join();
};

/**
 * Either 函子
 * @param {*} val
 */
Fish.prototype.Either = function (){};

Fish.prototype.Either.Some = function (val) {
    this.value = val;
};

Fish.prototype.Either.Some.of = function (val) {
    return new Fish.prototype.Either.Some(val);
};

Fish.prototype.Either.Some.prototype.map = function (fn) {
    return new Fish.prototype.Either.Some(fn(this.value));
};

Fish.prototype.Either.Nothing = function (val) {
    this.value = val;
};

Fish.prototype.Either.Nothing.of = function (val) {
    return new Fish.prototype.Either.Nothing(val);
};

Fish.prototype.Either.Nothing.prototype.map = function (fn) {
    return this;
};

const _ = new Fish();
module.exports = _;