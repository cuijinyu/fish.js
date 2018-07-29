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
        result.push(fn(array[i]))
    return result;
};

Fish.prototype.reduce = (array, fn) => {

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
    let flag = false,
        _this = this;
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
              args[i] = fullArguments[arg];
              arg ++;
          }
      }
  }
};
module.exports = Fish;