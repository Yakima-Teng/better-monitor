/**
 * Name: better-monitor
 * Version: 0.0.18
 * Created: 2024-06-04 17:41:26
 * Document: https://www.verybugs.com/lib/
 */

'use strict';

var store = {
  // 项目id
  projectId: '',
  view: true,
  log: true,
  error: true,
  action: true,
  statistics: true,
  // 黑名单中的接口不会进行上报
  blackList: [],
  queuedLogs: [],
  queuedActions: [],
  queuedPerformanceLogs: new Set(),
  timeLogMap: new Map(),
  userId: undefined,
  getUserId: undefined
};
var updateStore = function updateStore(config) {
  return Object.assign(store, config);
};
var getStore = function getStore() {
  return store;
};

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;
var getPrototypeOf = Object.getPrototypeOf;
var kindOf = function (cache) {
  return function (thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(Object.create(null));
var kindOfTest = function kindOfTest(type) {
  type = type.toLowerCase();
  return function (thing) {
    return kindOf(thing) === type;
  };
};
var typeOfTest = function typeOfTest(type) {
  return function (thing) {
    return typeof thing === type;
  };
};

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
var isArray = Array.isArray;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
var isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
var isString$1 = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
var isFunction$1 = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
var isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
var isObject = function isObject(thing) {
  return thing !== null && typeof thing === 'object';
};

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
var isBoolean = function isBoolean(thing) {
  return thing === true || thing === false;
};

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
var isPlainObject = function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }
  var prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
var isStream = function isStream(val) {
  return isObject(val) && isFunction$1(val.pipe);
};

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
var isFormData = function isFormData(thing) {
  var kind;
  return thing && (typeof FormData === 'function' && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === 'formdata' ||
  // detect form-data instance
  kind === 'object' && isFunction$1(thing.toString) && thing.toString() === '[object FormData]'));
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
var trim = function trim(str) {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$allOwnKeys = _ref.allOwnKeys,
    allOwnKeys = _ref$allOwnKeys === void 0 ? false : _ref$allOwnKeys;
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  var i;
  var l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    var keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    var len = keys.length;
    var key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  var keys = Object.keys(obj);
  var i = keys.length;
  var _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
var _global = function () {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== 'undefined' ? window : global;
}();
var isContextDefined = function isContextDefined(context) {
  return !isUndefined(context) && context !== _global;
};

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge( /* obj1, obj2, obj3, ... */
) {
  var _ref2 = isContextDefined(this) && this || {},
    caseless = _ref2.caseless;
  var result = {};
  var assignValue = function assignValue(val, key) {
    var targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (var i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
var extend = function extend(a, b, thisArg, _temp2) {
  var _ref3 = _temp2 === void 0 ? {} : _temp2,
    allOwnKeys = _ref3.allOwnKeys;
  forEach(b, function (val, key) {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {
    allOwnKeys: allOwnKeys
  });
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
var stripBOM = function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
var inherits = function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
var toFlatObject = function toFlatObject(sourceObj, destObj, filter, propFilter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
var endsWith = function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
var toArray = function toArray(thing) {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  var i = thing.length;
  if (!isNumber(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
var isTypedArray = function (TypedArray) {
  // eslint-disable-next-line func-names
  return function (thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
var forEachEntry = function forEachEntry(obj, fn) {
  var generator = obj && obj[Symbol.iterator];
  var iterator = generator.call(obj);
  var result;
  while ((result = iterator.next()) && !result.done) {
    var pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
var matchAll = function matchAll(regExp, str) {
  var matches;
  var arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
var isHTMLForm = kindOfTest('HTMLFormElement');
var toCamelCase = function toCamelCase(str) {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};

/* Creating a function that will check if an object has a property. */
var hasOwnProperty = function (_ref4) {
  var hasOwnProperty = _ref4.hasOwnProperty;
  return function (obj, prop) {
    return hasOwnProperty.call(obj, prop);
  };
}(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
var isRegExp = kindOfTest('RegExp');
var reduceDescriptors = function reduceDescriptors(obj, reducer) {
  var descriptors = Object.getOwnPropertyDescriptors(obj);
  var reducedDescriptors = {};
  forEach(descriptors, function (descriptor, name) {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

var freezeMethods = function freezeMethods(obj) {
  reduceDescriptors(obj, function (descriptor, name) {
    // skip restricted props in strict mode
    if (isFunction$1(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }
    var value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = function () {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};
var toObjectSet = function toObjectSet(arrayOrString, delimiter) {
  var obj = {};
  var define = function define(arr) {
    arr.forEach(function (value) {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
var noop = function noop() {};
var toFiniteNumber = function toFiniteNumber(value, defaultValue) {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};
var ALPHA = 'abcdefghijklmnopqrstuvwxyz';
var DIGIT = '0123456789';
var ALPHABET = {
  DIGIT: DIGIT,
  ALPHA: ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = function generateString(size, alphabet) {
  if (size === void 0) {
    size = 16;
  }
  if (alphabet === void 0) {
    alphabet = ALPHABET.ALPHA_DIGIT;
  }
  var str = '';
  var _alphabet = alphabet,
    length = _alphabet.length;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}
var toJSONObject = function toJSONObject(obj) {
  var stack = new Array(10);
  var visit = function visit(source, i) {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!('toJSON' in source)) {
        stack[i] = source;
        var target = isArray(source) ? [] : {};
        forEach(source, function (value, key) {
          var reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = undefined;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest('AsyncFunction');
var isThenable = function isThenable(thing) {
  return thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing["catch"]);
};
var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber,
  isBoolean: isBoolean,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isRegExp: isRegExp,
  isFunction: isFunction$1,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isTypedArray: isTypedArray,
  isFileList: isFileList,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  forEachEntry: forEachEntry,
  matchAll: matchAll,
  isHTMLForm: isHTMLForm,
  hasOwnProperty: hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: reduceDescriptors,
  freezeMethods: freezeMethods,
  toObjectSet: toObjectSet,
  toCamelCase: toCamelCase,
  noop: noop,
  toFiniteNumber: toFiniteNumber,
  findKey: findKey,
  global: _global,
  isContextDefined: isContextDefined,
  ALPHABET: ALPHABET,
  generateString: generateString,
  isSpecCompliantForm: isSpecCompliantForm,
  toJSONObject: toJSONObject,
  isAsyncFn: isAsyncFn,
  isThenable: isThenable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}
utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype$1 = AxiosError.prototype;
var descriptors = {};
['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED', 'ERR_NOT_SUPPORT', 'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(function (code) {
  descriptors[code] = {
    value: code
  };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {
  value: true
});

// eslint-disable-next-line func-names
AxiosError.from = function (error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype$1);
  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, function (prop) {
    return prop !== 'isAxiosError';
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });
  var metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  var visitor = options.visitor || defaultVisitor;
  var dots = options.dots;
  var indexes = options.indexes;
  var _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  var useBlob = _Blob && utils.isSpecCompliantForm(formData);
  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }
  function convertValue(value) {
    if (value === null) return '';
    if (utils.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }
    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    var arr = value;
    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (utils.isArray(value) && isFlatArray(value) || (utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
          // eslint-disable-next-line no-nested-ternary
          indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  var stack = [];
  var exposedHelpers = Object.assign(predicates, {
    defaultVisitor: defaultVisitor,
    convertValue: convertValue,
    isVisitable: isVisitable
  });
  function build(value, path) {
    if (utils.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }
    stack.push(value);
    utils.forEach(value, function each(el, key) {
      var result = !(utils.isUndefined(el) || el === null) && visitor.call(formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }
  build(obj);
  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  var charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
  var _encode = encoder ? function (value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  var _encode = options && options.encode || encode;
  var serializeFn = options && options.serialize;
  var serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

var InterceptorManager = /*#__PURE__*/function () {
  function InterceptorManager() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  var _proto = InterceptorManager.prototype;
  _proto.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */;
  _proto.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */;
  _proto.clear = function clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */;
  _proto.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  return InterceptorManager;
}();
var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
var isStandardBrowserEnv = function () {
  var product;
  if (typeof navigator !== 'undefined' && ((product = navigator.product) === 'ReactNative' || product === 'NativeScript' || product === 'NS')) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
var isStandardBrowserWebWorkerEnv = function () {
  return typeof WorkerGlobalScope !== 'undefined' &&
  // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
}();
var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv: isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv: isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function visitor(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(function (match) {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  var obj = {};
  var keys = Object.keys(arr);
  var i;
  var len = keys.length;
  var key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    var name = path[index++];
    var isNumericKey = Number.isFinite(+name);
    var isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }
    var result = buildPath(path, value, target[name], index);
    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    var obj = {};
    utils.forEachEntry(formData, function (name, value) {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
  transitional: transitionalDefaults,
  adapter: ['xhr', 'http'],
  transformRequest: [function transformRequest(data, headers) {
    var contentType = headers.getContentType() || '';
    var hasJSONContentType = contentType.indexOf('application/json') > -1;
    var isObjectPayload = utils.isObject(data);
    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }
    var isFormData = utils.isFormData(data);
    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }
    var isFileList;
    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        var _FormData = this.env && this.env.FormData;
        return toFormData(isFileList ? {
          'files[]': data
        } : data, _FormData && new _FormData(), this.formSerializer);
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var JSONRequested = this.responseType === 'json';
    if (data && utils.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      var silentJSONParsing = transitional && transitional.silentJSONParsing;
      var strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = utils.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = (function (rawHeaders) {
  var parsed = {};
  var key;
  var val;
  var i;
  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });
  return parsed;
});

var $internals = Symbol('internals');
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  var tokens = Object.create(null);
  var tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  var match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
var isValidHeaderName = function isValidHeaderName(str) {
  return /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
};
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils.isString(value)) return;
  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }
  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, function (w, _char, str) {
    return _char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  var accessorName = utils.toCamelCase(' ' + header);
  ['get', 'set', 'has'].forEach(function (methodName) {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function value(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
var AxiosHeaders = /*#__PURE__*/function (_Symbol$iterator, _Symbol$toStringTag) {
  function AxiosHeaders(headers) {
    headers && this.set(headers);
  }
  var _proto = AxiosHeaders.prototype;
  _proto.set = function set(header, valueOrRewrite, rewrite) {
    var self = this;
    function setHeader(_value, _header, _rewrite) {
      var lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }
      var key = utils.findKey(self, lHeader);
      if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
        self[key || _header] = normalizeValue(_value);
      }
    }
    var setHeaders = function setHeaders(headers, _rewrite) {
      return utils.forEach(headers, function (_value, _header) {
        return setHeader(_value, _header, _rewrite);
      });
    };
    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  };
  _proto.get = function get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      var key = utils.findKey(this, header);
      if (key) {
        var value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  };
  _proto.has = function has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      var key = utils.findKey(this, header);
      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  };
  _proto["delete"] = function _delete(header, matcher) {
    var self = this;
    var deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        var key = utils.findKey(self, _header);
        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];
          deleted = true;
        }
      }
    }
    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  };
  _proto.clear = function clear(matcher) {
    var keys = Object.keys(this);
    var i = keys.length;
    var deleted = false;
    while (i--) {
      var key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  };
  _proto.normalize = function normalize(format) {
    var self = this;
    var headers = {};
    utils.forEach(this, function (value, header) {
      var key = utils.findKey(headers, header);
      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }
      var normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self[header];
      }
      self[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  };
  _proto.concat = function concat() {
    var _this$constructor;
    for (var _len = arguments.length, targets = new Array(_len), _key = 0; _key < _len; _key++) {
      targets[_key] = arguments[_key];
    }
    return (_this$constructor = this.constructor).concat.apply(_this$constructor, [this].concat(targets));
  };
  _proto.toJSON = function toJSON(asStrings) {
    var obj = Object.create(null);
    utils.forEach(this, function (value, header) {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });
    return obj;
  };
  _proto[_Symbol$iterator] = function () {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  };
  _proto.toString = function toString() {
    return Object.entries(this.toJSON()).map(function (_ref) {
      var header = _ref[0],
        value = _ref[1];
      return header + ': ' + value;
    }).join('\n');
  };
  AxiosHeaders.from = function from(thing) {
    return thing instanceof this ? thing : new this(thing);
  };
  AxiosHeaders.concat = function concat(first) {
    var computed = new this(first);
    for (var _len2 = arguments.length, targets = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      targets[_key2 - 1] = arguments[_key2];
    }
    targets.forEach(function (target) {
      return computed.set(target);
    });
    return computed;
  };
  AxiosHeaders.accessor = function accessor(header) {
    var internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    var accessors = internals.accessors;
    var prototype = this.prototype;
    function defineAccessor(_header) {
      var lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }
    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  };
  _createClass(AxiosHeaders, [{
    key: _Symbol$toStringTag,
    get: function get() {
      return 'AxiosHeaders';
    }
  }]);
  return AxiosHeaders;
}(Symbol.iterator, Symbol.toStringTag);
AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);
utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);
var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  var config = this || defaults$1;
  var context = response || config;
  var headers = AxiosHeaders$1.from(context.headers);
  var data = context.data;
  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });
  headers.normalize();
  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}
utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
}

var cookies = platform.isStandardBrowserEnv ?
// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));
      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }
      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }
      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }
      if (secure === true) {
        cookie.push('secure');
      }
      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() :
// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.isStandardBrowserEnv ?
// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    var href = url;
    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :
// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  var bytes = new Array(samplesCount);
  var timestamps = new Array(samplesCount);
  var head = 0;
  var tail = 0;
  var firstSampleTS;
  min = min !== undefined ? min : 1000;
  return function push(chunkLength) {
    var now = Date.now();
    var startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    var i = tail;
    var bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    var passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  var bytesNotified = 0;
  var _speedometer = speedometer(50, 250);
  return function (e) {
    var loaded = e.loaded;
    var total = e.lengthComputable ? e.total : undefined;
    var progressBytes = loaded - bytesNotified;
    var rate = _speedometer(progressBytes);
    var inRange = loaded <= total;
    bytesNotified = loaded;
    var data = {
      loaded: loaded,
      total: total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };
    data[isDownloadStream ? 'download' : 'upload'] = true;
    listener(data);
  };
}
var isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }
    if (utils.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else {
        requestHeaders.setContentType('multipart/form-data;', false); // mobile/desktop app frameworks
      }
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }
    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = AxiosHeaders$1.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
      var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }
    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);
      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }
    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function onCanceled(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }
    var protocol = parseProtocol(fullPath);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }

    // Send the request
    request.send(requestData || null);
  });
};

var knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};
utils.forEach(knownAdapters, function (fn, value) {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {
        value: value
      });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {
      value: value
    });
  }
});
var adapters = {
  getAdapter: function getAdapter(adapters) {
    adapters = utils.isArray(adapters) ? adapters : [adapters];
    var _adapters = adapters,
      length = _adapters.length;
    var nameOrAdapter;
    var adapter;
    for (var i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if (adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
        break;
      }
    }
    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError("Adapter " + nameOrAdapter + " is not supported by the environment", 'ERR_NOT_SUPPORT');
      }
      throw new Error(utils.hasOwnProp(knownAdapters, nameOrAdapter) ? "Adapter '" + nameOrAdapter + "' is not available in the build" : "Unknown adapter '" + nameOrAdapter + "'");
    }
    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }
    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(config, config.transformRequest);
  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }
  var adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(config, config.transformResponse, response);
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, config.transformResponse, reason.response);
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}

var headersToObject = function headersToObject(thing) {
  return thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({
        caseless: caseless
      }, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }
  var mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: function headers(a, b) {
      return mergeDeepProperties(headersToObject(a), headersToObject(b), true);
    }
  };
  utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(config1[prop], config2[prop], prop);
    utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

var VERSION = "1.4.0";

var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});
var deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function (value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
    }
    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator = {
  assertOptions: assertOptions,
  validators: validators$1
};

var validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
var Axios = /*#__PURE__*/function () {
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  var _proto = Axios.prototype;
  _proto.request = function request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    var _config = config,
      transitional = _config.transitional,
      paramsSerializer = _config.paramsSerializer,
      headers = _config.headers;
    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators["boolean"]),
        forcedJSONParsing: validators.transitional(validators["boolean"]),
        clarifyTimeoutError: validators.transitional(validators["boolean"])
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators["function"],
          serialize: validators["function"]
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();
    var contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(headers.common, headers[config.method]);
    contextHeaders && utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (method) {
      delete headers[method];
    });
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    var i = 0;
    var len;
    if (!synchronousRequestInterceptors) {
      var chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    var newConfig = config;
    i = 0;
    while (i < len) {
      var onFulfilled = requestInterceptorChain[i++];
      var onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  };
  _proto.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    var fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  };
  return Axios;
}(); // Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
var CancelToken = /*#__PURE__*/function () {
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;

    // eslint-disable-next-line func-names
    this.promise.then(function (cancel) {
      if (!token._listeners) return;
      var i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = function (onfulfilled) {
      var _resolve;
      // eslint-disable-next-line func-names
      var promise = new Promise(function (resolve) {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }
      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  var _proto = CancelToken.prototype;
  _proto.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */;
  _proto.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */;
  _proto.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */;
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };
  return CancelToken;
}();
var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && payload.isAxiosError === true;
}

var HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(function (_ref) {
  var key = _ref[0],
    value = _ref[1];
  HttpStatusCode[value] = key;
});
var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios$1(defaultConfig);
  var instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios$1.prototype, context, {
    allOwnKeys: true
  });

  // Copy context to instance
  utils.extend(instance, context, null, {
    allOwnKeys: true
  });

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = function (thing) {
  return formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
};
axios.HttpStatusCode = HttpStatusCode$1;
axios["default"] = axios;

// this module should only have a default export
var axios$1 = axios;

// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
axios$1.Axios;
  axios$1.AxiosError;
  axios$1.CanceledError;
  axios$1.isCancel;
  axios$1.CancelToken;
  axios$1.VERSION;
  axios$1.all;
  axios$1.Cancel;
  axios$1.isAxiosError;
  axios$1.spread;
  axios$1.toFormData;
  axios$1.AxiosHeaders;
  axios$1.HttpStatusCode;
  axios$1.formToJSON;
  axios$1.mergeConfig;

/**
 * 获取变量的类型
 * @param val {any} 需要判断类型的变量
 * @return {string} 返回类型字符串，如`"array"`、`"object"`、`"function"`、`"null"`、`"undefined"`、`"string"`、`"number"`、`"boolean"`、`"date"`、`"regexp"`等
 *
 * @example
 *
 * ```javascript
 * console.log(getType({}) // 'object'
 * console.log(getType([]) // 'array'
 * console.log(getType(() => {})) // 'function'
 * console.log(getType(null)) // 'null'
 * console.log(getType(undefined)) // 'undefined'
 * console.log(getType('')) // 'string'
 * console.log(getType(123)) // 'number'
 * console.log(getType(true)) // 'boolean'
 * console.log(getType(new Date())) // 'date'
 * console.log(getType(/^[0-9]{3}/)) // 'regexp'
 * console.log(getType('test')) // 'string'
 * ```
 */
var getType = function getType(val) {
  return {}.toString.call(val).slice(8, -1).toLowerCase();
};

/**
 * @apiAnalyze
 * 是否是字符串
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
var isString = function isString(val) {
  return getType(val) === 'string';
};

/**
 * @apiAnalyze
 * 是否是函数
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
var isFunction = function isFunction(val) {
  return getType(val) === 'function';
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#examples
function getCircularReplacer() {
  var ancestors = [];
  return function (key, value) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    // `this` is the object that value is contained in,
    // i.e., its direct parent.
    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop();
    }
    if (ancestors.includes(value)) {
      return '[Circular]';
    }
    ancestors.push(value);
    return value;
  };
}
var safeStringify = function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (err) {
    try {
      return JSON.stringify(value, getCircularReplacer());
    } catch (e) {
      return '';
    }
  }
};

/**
 * @apiAnalyze
 * @since 0.02
 * @param payload {Record<string, any>} 入参
 * @return {Promise<BetterMonitor.IAxiosResponse<T>>}
 *
 * @example
 * ```typescript
 * const addLog = (params: IParamsAddLog) => {
 *   return request<null>({
 *     url: 'https://api.verysites.com/api/verybugs/logs/addLog',
 *     method: 'post',
 *     data: params,
 *   })
 * }
 * const res = addLog(params)
 * // 返回的res.data.data就是调用request时后面<>中传入的类型
 * console.log(res.data.data) // null
 * ```
 */
var cacheRequests = new Map();
var request = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload) {
    var startTime, url, method, params, data, headers, responseType, timeout, cacheTime, cacheKey, _cacheRequests$get, ts, result, axiosConfig, returnResult;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          startTime = Date.now();
          url = payload.url || '';
          method = payload.method || 'get';
          params = payload.params || {};
          data = payload.data || {};
          headers = payload.headers || {};
          responseType = payload.responseType;
          timeout = payload.timeout || 60000;
          cacheTime = payload.cacheTime || 0;
          cacheKey = '';
          if (!(cacheTime > 0)) {
            _context.next = 20;
            break;
          }
          if (payload.cacheKey) {
            if (isString(payload.cacheKey)) {
              cacheKey = payload.cacheKey;
            } else if (isFunction(payload.cacheKey)) {
              cacheKey = payload.cacheKey();
            }
          }
          if (!cacheKey) {
            cacheKey = safeStringify({
              url: url,
              method: method,
              params: params,
              data: data
            });
          }
          if (!cacheRequests.has(cacheKey)) {
            _context.next = 20;
            break;
          }
          _cacheRequests$get = cacheRequests.get(cacheKey), ts = _cacheRequests$get.ts, result = _cacheRequests$get.result; // 缓存过期失效
          if (!(startTime - ts > cacheTime)) {
            _context.next = 19;
            break;
          }
          cacheRequests["delete"](cacheKey);
          _context.next = 20;
          break;
        case 19:
          return _context.abrupt("return", result);
        case 20:
          // @ts-ignore
          axiosConfig = {
            url: url,
            method: method,
            headers: headers,
            params: params,
            data: data,
            timeout: timeout
          };
          if (responseType) {
            axiosConfig.responseType = responseType;
          }
          if (data instanceof FormData) {
            headers['Content-Type'] = 'multipart/form-data';
          }
          _context.prev = 23;
          returnResult = axios$1(axiosConfig);
          if (cacheTime > 0) {
            cacheRequests.set(cacheKey, {
              ts: startTime,
              result: returnResult
            });
          }
          return _context.abrupt("return", returnResult);
        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](23);
          if (!axios$1.isAxiosError(_context.t0)) {
            _context.next = 33;
            break;
          }
          throw new Error(_context.t0.message);
        case 33:
          throw new Error('An unexpected error occurred');
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[23, 29]]);
  }));
  return function request(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 即navigator.sendBeacon()方法，可用于通过HTTP将少量数据异步传输到Web服务器
 *
 * @return {boolean} The sendBeacon() method returns true if the user agent successfully queued the data for transfer. Otherwise, it returns false.
 */
var sendBeacon = function sendBeacon(url, jsonData) {
  if (typeof navigator.sendBeacon === 'function') {
    return navigator.sendBeacon(url, safeStringify(jsonData));
  }
  return false;
};

// 前端域名
var FRONTEND_DOMAIN = 'https://www.verybugs.com';
// export const FRONTEND_DOMAIN = 'http://localhost:8989'
// 后端域名
var BACKEND_DOMAIN = 'https://api.verysites.com';

// 校验请求参数是否在黑名单中，如果返回false表示在黑名单中，不继续后续上报操作
var validateBugRequestData = function validateBugRequestData(requestData) {
  var _getStore = getStore(),
    blackList = _getStore.blackList;
  var matchKeyword = function matchKeyword(keyword) {
    if (isString(keyword)) {
      return requestData.message.includes(keyword) || requestData.message.includes(keyword);
    }
    return keyword.test(requestData.message) || keyword.test(requestData.message);
  };
  // 当页面不在SDK自身所在项目页面中时，SDK自身的报错不需要上报，否则在上报接口有出错时容易死循环
  var selfBlackList = [FRONTEND_DOMAIN];
  if (!requestData.pageUrl.includes(FRONTEND_DOMAIN) && selfBlackList.some(matchKeyword)) {
    return false;
  }
  // 存在有黑名单中关键词的报错信息，不需要上报
  if (blackList.length > 0 && blackList.some(matchKeyword)) {
    return false;
  }
  return true;
};
/**
 * @apiAnalyze
 * 添加错误上报日志
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; errorMessage: string; errorStack: string; json: string }`
 * @return {Promise<void>}
 */
var addBug = function addBug(params) {
  var _getStore2 = getStore(),
    projectId = _getStore2.projectId;
  var requestUrl = BACKEND_DOMAIN + "/api/verybugs/bugs/addBug";
  var requestData = _extends({
    projectId: projectId
  }, params);
  var isQueued = sendBeacon(requestUrl, requestData);
  if (isQueued) return;
  request({
    url: requestUrl,
    method: 'post',
    data: requestData,
    timeout: 60 * 1000
  });
};

/**
 * @apiAnalyze
 * 添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; userId: string |number; }`
 * @return {Promise<void>}
 */
var addView = function addView(params) {
  var _getStore = getStore(),
    projectId = _getStore.projectId,
    blackList = _getStore.blackList;
  var pageUrl = params.pageUrl;
  var matchKeyword = function matchKeyword(keyword) {
    if (isString(keyword)) {
      return pageUrl.includes(keyword);
    }
    return keyword.test(pageUrl);
  };
  // 黑名单中的接口请求不需要进行上报
  if (blackList.some(matchKeyword)) {
    return;
  }
  var requestUrl = BACKEND_DOMAIN + "/api/verybugs/view/addView";
  var requestData = _extends({
    projectId: projectId
  }, params);
  var isQueued = sendBeacon(requestUrl, requestData);
  if (isQueued) return;
  request({
    url: requestUrl,
    method: 'post',
    data: requestData,
    timeout: 60 * 1000
  });
};

/**
 * @apiAnalyze
 * 将一个数字或字符串用指定的字符从左侧开始填充到指定长度
 * @since 0.02
 * @param val {string|number}
 * @param len {number} target length after filling
 * @param symbol {string} used to fill string/number
 * @return {string} string after filling
 *
 * @example
 * ```javascript
 * console.log(fillLeft('a', 2, '$')) // '$a'
 * console.log(fillLeft('aa', 2, '$')) // 'aa'
 * console.log(fillLeft('aaa', 2, '$')) // 'aaa'
 * console.log(fillLeft('aa', 10, '0') // '00000000aa'
 * ```
 */
var fillLeft = function fillLeft(val, len, symbol) {
  val = "" + val;
  var diffInLength = len - val.length;
  if (diffInLength > 0) {
    for (var i = 0; i < diffInLength; i++) {
      val = symbol + val;
    }
  }
  return val;
};

// 获取带毫秒的时间文本，用于日志打印
var toDouble = function toDouble(num) {
  return fillLeft(num, 2, '0');
};
var getLogTime = function getLogTime() {
  var objDate = new Date();
  var year = objDate.getFullYear();
  var month = toDouble(objDate.getMonth() + 1);
  var day = toDouble(objDate.getDate());
  var hour = toDouble(objDate.getHours());
  var min = toDouble(objDate.getMinutes());
  var seconds = toDouble(objDate.getSeconds());
  var milliseconds = objDate.getMilliseconds();
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds + "." + milliseconds;
};

/**
 * @apiAnalyze
 * Get the value of localStorage item of specified key/name
 * @since 0.02
 * @param key {string} the specified key/name of the storage item
 * @return {object | null} value of localStorage item
 *
 * @example
 * ```javascript
 * getLocalStorage('localStorageItemName')
 * ```
 */
var getLocalStorage = function getLocalStorage(key) {
  if ('localStorage' in window) {
    var rawVal = window.localStorage.getItem(key);
    if (rawVal) {
      return JSON.parse(decodeURI(rawVal));
    }
    return null;
  }
  throw new Error('localStorage is not supported!');
};

var getUserId = function getUserId() {
  var store = getStore();
  if (typeof store.userId !== 'undefined') {
    return store.userId;
  }
  if (typeof store.getUserId === 'function') {
    var gettingUserId = store.getUserId();
    if (gettingUserId instanceof Promise) {
      // 这里不需要等promise返回结果后再返回，这里对实时性要求没有这么高，先返回0，同时异步更新userId即可
      gettingUserId.then(function (userId) {
        updateStore({
          userId: userId
        });
      })["catch"](function (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      });
      return 0;
    }
    updateStore({
      userId: gettingUserId
    });
    return gettingUserId;
  }
  // 这段代码后续可以去掉，这里直接return 0
  var user = getLocalStorage('user');
  return Number((user == null ? void 0 : user.id) || 0);
};

var timerAddActions = 0;
var clearTimerAddActions = function clearTimerAddActions() {
  if (timerAddActions) {
    clearTimeout(timerAddActions);
    timerAddActions = 0;
  }
};
var doAddActions = function doAddActions(_ref) {
  var _ref$preferSendBeacon = _ref.preferSendBeacon,
    preferSendBeacon = _ref$preferSendBeacon === void 0 ? false : _ref$preferSendBeacon;
  var _getStore = getStore(),
    projectId = _getStore.projectId,
    queuedActions = _getStore.queuedActions;
  if (queuedActions.length === 0) return;
  var requestUrl = BACKEND_DOMAIN + "/api/verybugs/actions/addActions";
  var requestData = {
    projectId: projectId,
    list: queuedActions
  };
  var isQueued = false;
  if (preferSendBeacon) {
    isQueued = sendBeacon(requestUrl, requestData);
  }
  if (!isQueued) {
    request({
      url: requestUrl,
      method: 'post',
      data: requestData,
      timeout: 60 * 1000
    });
  }
  updateStore({
    queuedActions: []
  });
};
/**
 * 批量上报行为日志
 */
var addActions = function addActions(params) {
  var preferSendBeacon = params.preferSendBeacon,
    _params$delayTime = params.delayTime,
    delayTime = _params$delayTime === void 0 ? 0 : _params$delayTime;
  clearTimerAddActions();
  if (!delayTime) {
    doAddActions({
      preferSendBeacon: preferSendBeacon
    });
    return;
  }
  timerAddActions = setTimeout(function () {
    doAddActions({
      preferSendBeacon: preferSendBeacon
    });
  }, delayTime);
};
/**
 * 上报单条行为日志
 */
var addAction = function addAction(params) {
  var _getStore2 = getStore(),
    blackList = _getStore2.blackList,
    queuedActions = _getStore2.queuedActions;
  var payload = params.payload,
    directly = params.directly;
  var matchKeyword = function matchKeyword(keyword) {
    if (isString(keyword)) {
      return payload.includes(keyword);
    }
    return keyword.test(payload);
  };
  var selfBlackList = [BACKEND_DOMAIN];
  if (!location.href.includes(BACKEND_DOMAIN) && selfBlackList.some(matchKeyword)) {
    return;
  }
  // 黑名单中的日志不需要进行上报
  if (blackList.some(matchKeyword)) {
    return;
  }
  queuedActions.push(params);
  updateStore({
    queuedActions: queuedActions
  });
  if (directly || queuedActions.length > 10) {
    addActions({
      preferSendBeacon: false,
      delayTime: 800
    });
    return;
  }
  try {
    var strActions = safeStringify(queuedActions);
    if (strActions.length > 10000) {
      addActions({
        preferSendBeacon: false,
        delayTime: 800
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('部分日志因JSON.stringify失败导致无法上传', e);
  }
};
var getLogColorByLevel = function getLogColorByLevel(level) {
  if (level === 'error') {
    return 'red';
  }
  if (level === 'warn') {
    return 'orange';
  }
  return 'gray';
};
/**
 * @apiAnalyze
 * 打日志的方法（本地开发时如为方便追中调用栈，可以使用console.error代替console.log）
 * @since 0.0.2
 */
var doLog = function () {
  // eslint-disable-next-line no-console
  var rawLog = console.log;
  return function (level) {
    var time = getLogTime();
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    addAction({
      pageUrl: location.href,
      time: time,
      level: level,
      payload: safeStringify(args),
      userId: getUserId()
    });
    var color = getLogColorByLevel(level);
    return rawLog.apply(void 0, ["%c[" + time + "]", "color:" + color + ";"].concat(args));
  };
}();
// 直接上报
var doLogDirectly = function () {
  // eslint-disable-next-line no-console
  var rawLog = console.log;
  return function (level) {
    var time = getLogTime();
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    addAction({
      pageUrl: location.href,
      time: time,
      level: level,
      payload: safeStringify(args),
      userId: getUserId(),
      directly: true
    });
    var color = getLogColorByLevel(level);
    return rawLog.apply(void 0, ["%c[" + time + "]", "color:" + color + ";"].concat(args));
  };
}();
// 打印普通日志
var printLog = function printLog() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  return doLog.apply(void 0, ['log'].concat(args));
};
var printLogDirectly = function printLogDirectly() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }
  return doLogDirectly.apply(void 0, ['log'].concat(args));
};
// 打印警告日志
var printWarn = function printWarn() {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }
  return doLog.apply(void 0, ['warn'].concat(args));
};
var printWarnDirectly = function printWarnDirectly() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  return doLogDirectly.apply(void 0, ['warn'].concat(args));
};
// 打印错误日志
var printError = function printError() {
  for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }
  return doLog.apply(void 0, ['error'].concat(args));
};
var printErrorDirectly = function printErrorDirectly() {
  for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }
  return doLogDirectly.apply(void 0, ['error'].concat(args));
};
var logTime = function logTime(label) {
  var _getStore3 = getStore(),
    timeLogMap = _getStore3.timeLogMap;
  var startTime = Date.now();
  timeLogMap.set(label, startTime);
};
var logTimeEnd = function logTimeEnd(label) {
  var _getStore4 = getStore(),
    timeLogMap = _getStore4.timeLogMap;
  var endTime = Date.now();
  var startTime = timeLogMap.get(label);
  if (!startTime) return;
  var duration = endTime - startTime;
  timeLogMap["delete"](label);
  if (duration < 100) {
    printLog(label + "\u8017\u65F6\u8F83\u5FEB\uFF1A" + duration + "ms");
    return;
  }
  printError(label + "\u8017\u65F6\u8F83\u6162\uFF1A" + (duration / 1000).toFixed(3) + "s");
};
var logTimeEndDirectly = function logTimeEndDirectly(label) {
  var _getStore5 = getStore(),
    timeLogMap = _getStore5.timeLogMap;
  var endTime = Date.now();
  var startTime = timeLogMap.get(label);
  if (!startTime) return;
  var duration = endTime - startTime;
  timeLogMap["delete"](label);
  if (duration < 100) {
    printLogDirectly(label + "\u8017\u65F6\u8F83\u5FEB\uFF1A" + duration + "ms");
    return;
  }
  printErrorDirectly(label + "\u8017\u65F6\u8F83\u6162\uFF1A" + (duration / 1000).toFixed(3) + "s");
};

/**
 * 批量上报接口日志
 */
var addLogs = function addLogs() {
  var _getStore = getStore(),
    projectId = _getStore.projectId,
    queuedLogs = _getStore.queuedLogs;
  if (queuedLogs.length === 0) return;
  var requestUrl = BACKEND_DOMAIN + "/api/verybugs/logs/addLogs";
  var requestData = {
    projectId: projectId,
    list: queuedLogs
  };
  var isQueued = sendBeacon(requestUrl, requestData);
  if (!isQueued) {
    request({
      url: requestUrl,
      method: 'post',
      data: requestData,
      timeout: 60 * 1000
    });
  }
  updateStore({
    queuedLogs: []
  });
};
/**
 * @apiAnalyze
 * 添加接口上报日志
 * @since 0.02
 * @param params {Object} 包含字段`{ pageUrl: string; apiUrl: string; payload: string; response: string; json: string; }`
 * @return {Promise<void>}
 */
var addLog = function addLog(params) {
  var _getStore2 = getStore(),
    blackList = _getStore2.blackList,
    queuedLogs = _getStore2.queuedLogs;
  var apiUrl = params.apiUrl;
  var matchKeyword = function matchKeyword(keyword) {
    if (isString(keyword)) {
      return apiUrl.includes(keyword);
    }
    return keyword.test(apiUrl);
  };
  var selfBlackList = [BACKEND_DOMAIN];
  if (!location.href.includes(BACKEND_DOMAIN) && selfBlackList.some(matchKeyword)) {
    return;
  }
  // 黑名单中的接口请求不需要进行上报
  if (blackList.some(matchKeyword)) {
    return;
  }
  queuedLogs.push(params);
  updateStore({
    queuedLogs: queuedLogs
  });
  if (getStore().queuedLogs.length > 5) {
    addLogs();
  }
};

/**
 * @apiAnalyze
 * 解析url中的查询字符串为一个对象
 * @since 0.0.2
 * @param url {string} the url, usually got from window.location.href
 * @return {string} the value of specified query parameter
 *
 * @example
 * ```javascript
 * parseSearchString('http://www.baidu.com?a=1&b=c') // { a: '1', b: 'c' }
 * ```
 */
var parseSearchString = function parseSearchString(url) {
  var urlInstance;
  if (url.startsWith('http')) {
    urlInstance = new URL(url);
  } else if (url.startsWith('/')) {
    urlInstance = new URL("" + location.origin + url);
  } else {
    urlInstance = new URL(url, location.href);
  }
  var _urlInstance = urlInstance,
    searchParams = _urlInstance.searchParams;
  var returnObj = Object.create(null);
  searchParams.forEach(function (val, key) {
    returnObj[key] = val;
  });
  return returnObj;
};

var initLogPlugin = function initLogPlugin() {
  var _getStore = getStore(),
    log = _getStore.log;
  if (!log) {
    return;
  }
  window.addEventListener('beforeunload', addLogs);
  window.addEventListener('unload', addLogs);
  var nativeAjaxOpen = XMLHttpRequest.prototype.open;
  var nativeAjaxSend = XMLHttpRequest.prototype.send;
  // eslint-disable-next-line max-len
  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    var xhrInstance = this;
    xhrInstance.meta = {
      method: method,
      pageUrl: location.href,
      apiUrl: url.startsWith('http') ? url : "" + location.origin + url,
      params: parseSearchString(url),
      timeSend: '',
      body: {},
      timeConsumed: '',
      total: '',
      responseURL: '',
      responseText: '',
      allResponseHeaders: '',
      status: '',
      clientTime: Date.now()
    };
    return nativeAjaxOpen.apply(this, [method, url, typeof async === 'undefined' ? true : async, typeof user === 'string' ? user : null, typeof password === 'string' ? password : null]);
  };
  XMLHttpRequest.prototype.send = function (body) {
    var xhrInstance = this;
    var meta = xhrInstance.meta;
    var tempObj = {
      timeSend: "" + Date.now(),
      body: {}
    };
    if (typeof body === 'string') {
      try {
        tempObj.body = JSON.parse(body);
      } catch (e) {
        //
      }
    }
    Object.assign(meta, tempObj);
    xhrInstance.addEventListener('loadend', function (e) {
      var timeLoadEnd = Date.now();
      Object.assign(meta, {
        timeConsumed: "" + (timeLoadEnd - +meta.timeSend),
        total: "" + e.total,
        responseText: '',
        status: ''
      });
      /**
       * DOMException: Failed to read the 'responseText' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'text' (was 'arraybuffer').
       */
      var target = e.target;
      if (target instanceof XMLHttpRequest) {
        var responseType = target.responseType,
          status = target.status;
        Object.assign(meta, {
          responseURL: target.responseURL,
          responseText: ['', 'text'].includes(responseType) ? target.responseText : responseType,
          allResponseHeaders: target.getAllResponseHeaders(),
          status: "" + status
        });
      }
      addLog({
        pageUrl: meta.pageUrl,
        apiUrl: meta.responseURL || meta.apiUrl,
        payload: safeStringify({
          params: meta.params,
          data: meta.body
        }),
        response: meta.responseText.substring(0, 5000),
        json: safeStringify({
          method: meta.method,
          status: meta.status,
          timeConsumed: meta.timeConsumed,
          allResponseHeaders: meta.allResponseHeaders,
          clientTime: meta.clientTime
        })
      });
    });
    return nativeAjaxSend.apply(this, [typeof body === 'undefined' ? null : body]);
  };
};

var initActionPlugin = function initActionPlugin() {
  var _getStore = getStore(),
    action = _getStore.action;
  if (!action) {
    return;
  }
  var tryAddActions = function tryAddActions() {
    addActions({
      preferSendBeacon: true,
      delayTime: 0
    });
  };
  window.addEventListener('beforeunload', tryAddActions);
  window.addEventListener('unload', tryAddActions);
  var _window = window,
    history = _window.history;
  // 劫持pushState
  var oldPushState = history.pushState;
  history.pushState = function (state, unused, url) {
    oldPushState.call(history, state, unused, url);
    tryAddActions();
  };
};

var handlerFuncForJsError = function handlerFuncForJsError(e) {
  // eslint-disable-next-line no-console
  console.error(e);
  try {
    e.preventDefault();
    // 注意：error可能为null
    var error = e.error,
      colno = e.colno,
      lineno = e.lineno,
      filename = e.filename,
      type = e.type;
    var message = (error == null ? void 0 : error.message) || e.message;
    var stack = (error == null ? void 0 : error.stack) || '';
    var requestData = {
      pageUrl: location.href,
      message: message,
      stack: stack,
      source: filename + ":" + lineno + "\u884C:" + colno + "\u5217",
      type: type
    };
    if (!validateBugRequestData(requestData)) {
      return true;
    }
    addBug(requestData);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('catch error by BetterMonitor:');
    // eslint-disable-next-line no-console
    console.log(err);
    return true;
  }
};

var getStackTrace = function getStackTrace() {
  var obj = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window.Error && window.Error.captureStackTrace) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Error.captureStackTrace(obj, getStackTrace);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  var stackStr = obj.stack || '';
  return stackStr.split('\n').map(function (line) {
    return line.replace(/(^\s+)|(\s+$)/g, '');
  }).join('\n');
};

var handlerFuncForJsUnhandledRejection = function handlerFuncForJsUnhandledRejection(e) {
  // eslint-disable-next-line no-console
  console.error(e);
  try {
    e.preventDefault();
    /**
     * reason
     * 可能是字符串，比如promise内部reject('string')时
     * 也可能是一个Error对象（含message和stack），比如promise内部throw了new Error('string')时，或者在promise内部reject(new Error('string'))时
     * 建议业务代码里，reject时都reject出一个Error实例，不要直接reject字符串，这样方便拿stack错误栈信息
     */
    var reason = e.reason,
      type = e.type;
    var message = (reason == null ? void 0 : reason.message) || reason || '';
    var stack = (reason == null ? void 0 : reason.stack) || getStackTrace() || '';
    var requestData = {
      pageUrl: location.href,
      message: message,
      stack: stack,
      source: '',
      type: type
    };
    if (!validateBugRequestData(requestData)) {
      return true;
    }
    addBug(requestData);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return true;
  }
};

var initErrorPlugin = function initErrorPlugin() {
  var _getStore = getStore(),
    error = _getStore.error;
  if (!error) {
    return;
  }
  // 初始化js报错监听器
  window.addEventListener('error', handlerFuncForJsError, {
    capture: false,
    passive: false
  });
  // 初始化js未处理异常报错监听器
  window.addEventListener('unhandledrejection', handlerFuncForJsUnhandledRejection, {
    capture: false,
    passive: false
  });
};

/**
 * @apiAnalyze
 * 支持添加PV、UV、BV数据（page view, user view, browser view）
 * @since 0.02
 * @example
 * ```typescript
 * BetterMonitor.initViewPlugin()
 * ```
 */
var initViewPlugin = function initViewPlugin() {
  var _getStore = getStore(),
    view = _getStore.view;
  if (!view) {
    return;
  }
  var addViewBeforeUnload = function addViewBeforeUnload() {
    addView({
      pageUrl: location.href,
      userId: getUserId()
    });
  };
  window.addEventListener('load', addViewBeforeUnload);
  window.addEventListener('hashchange', addViewBeforeUnload);
  var _window = window,
    history = _window.history;
  // 劫持pushState
  var oldPushState = history.pushState;
  history.pushState = function (state, unused, url) {
    oldPushState.call(history, state, unused, url);
    addView({
      pageUrl: location.href,
      userId: getUserId()
    });
  };
  // 劫持replaceState
  // const oldReplaceState = history.replaceState
  // history.replaceState = (stateObj: any, title: string, url: string | URL) => {
  //   oldReplaceState.call(history, stateObj, title, url)
  //   addView({
  //     pageUrl: location.href,
  //     userId: getUserId(),
  //   })
  // }
};

var e,
  n,
  t,
  i,
  r,
  a = -1,
  o = function o(e) {
    addEventListener("pageshow", function (n) {
      n.persisted && (a = n.timeStamp, e(n));
    }, !0);
  },
  c = function c() {
    return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  },
  u = function u() {
    var e = c();
    return e && e.activationStart || 0;
  },
  f = function f(e, n) {
    var t = c(),
      i = "navigate";
    a >= 0 ? i = "back-forward-cache" : t && (document.prerendering || u() > 0 ? i = "prerender" : document.wasDiscarded ? i = "restore" : t.type && (i = t.type.replace(/_/g, "-")));
    return {
      name: e,
      value: void 0 === n ? -1 : n,
      rating: "good",
      delta: 0,
      entries: [],
      id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
      navigationType: i
    };
  },
  s = function s(e, n, t) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        var i = new PerformanceObserver(function (e) {
          Promise.resolve().then(function () {
            n(e.getEntries());
          });
        });
        return i.observe(Object.assign({
          type: e,
          buffered: !0
        }, t || {})), i;
      }
    } catch (e) {}
  },
  d = function d(e, n, t, i) {
    var r, a;
    return function (o) {
      n.value >= 0 && (o || i) && ((a = n.value - (r || 0)) || void 0 === r) && (r = n.value, n.delta = a, n.rating = function (e, n) {
        return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good";
      }(n.value, t), e(n));
    };
  },
  l = function l(e) {
    requestAnimationFrame(function () {
      return requestAnimationFrame(function () {
        return e();
      });
    });
  },
  p = function p(e) {
    var n = function n(_n) {
      "pagehide" !== _n.type && "hidden" !== document.visibilityState || e(_n);
    };
    addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0);
  },
  v = function v(e) {
    var n = !1;
    return function (t) {
      n || (e(t), n = !0);
    };
  },
  m = -1,
  h = function h() {
    return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
  },
  g = function g(e) {
    "hidden" === document.visibilityState && m > -1 && (m = "visibilitychange" === e.type ? e.timeStamp : 0, T());
  },
  y = function y() {
    addEventListener("visibilitychange", g, !0), addEventListener("prerenderingchange", g, !0);
  },
  T = function T() {
    removeEventListener("visibilitychange", g, !0), removeEventListener("prerenderingchange", g, !0);
  },
  E = function E() {
    return m < 0 && (m = h(), y(), o(function () {
      setTimeout(function () {
        m = h(), y();
      }, 0);
    })), {
      get firstHiddenTime() {
        return m;
      }
    };
  },
  C = function C(e) {
    document.prerendering ? addEventListener("prerenderingchange", function () {
      return e();
    }, !0) : e();
  },
  L = [1800, 3e3],
  w = function w(e, n) {
    n = n || {}, C(function () {
      var t,
        i = E(),
        r = f("FCP"),
        a = s("paint", function (e) {
          e.forEach(function (e) {
            "first-contentful-paint" === e.name && (a.disconnect(), e.startTime < i.firstHiddenTime && (r.value = Math.max(e.startTime - u(), 0), r.entries.push(e), t(!0)));
          });
        });
      a && (t = d(e, r, L, n.reportAllChanges), o(function (i) {
        r = f("FCP"), t = d(e, r, L, n.reportAllChanges), l(function () {
          r.value = performance.now() - i.timeStamp, t(!0);
        });
      }));
    });
  },
  b = [.1, .25],
  S = function S(e, n) {
    n = n || {}, w(v(function () {
      var t,
        i = f("CLS", 0),
        r = 0,
        a = [],
        c = function c(e) {
          e.forEach(function (e) {
            if (!e.hadRecentInput) {
              var n = a[0],
                t = a[a.length - 1];
              r && e.startTime - t.startTime < 1e3 && e.startTime - n.startTime < 5e3 ? (r += e.value, a.push(e)) : (r = e.value, a = [e]);
            }
          }), r > i.value && (i.value = r, i.entries = a, t());
        },
        u = s("layout-shift", c);
      u && (t = d(e, i, b, n.reportAllChanges), p(function () {
        c(u.takeRecords()), t(!0);
      }), o(function () {
        r = 0, i = f("CLS", 0), t = d(e, i, b, n.reportAllChanges), l(function () {
          return t();
        });
      }), setTimeout(t, 0));
    }));
  },
  A = {
    passive: !0,
    capture: !0
  },
  I = new Date(),
  P = function P(i, r) {
    e || (e = r, n = i, t = new Date(), k(removeEventListener), F());
  },
  F = function F() {
    if (n >= 0 && n < t - I) {
      var r = {
        entryType: "first-input",
        name: e.type,
        target: e.target,
        cancelable: e.cancelable,
        startTime: e.timeStamp,
        processingStart: e.timeStamp + n
      };
      i.forEach(function (e) {
        e(r);
      }), i = [];
    }
  },
  M = function M(e) {
    if (e.cancelable) {
      var n = (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
      "pointerdown" == e.type ? function (e, n) {
        var t = function t() {
            P(e, n), r();
          },
          i = function i() {
            r();
          },
          r = function r() {
            removeEventListener("pointerup", t, A), removeEventListener("pointercancel", i, A);
          };
        addEventListener("pointerup", t, A), addEventListener("pointercancel", i, A);
      }(n, e) : P(n, e);
    }
  },
  k = function k(e) {
    ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (n) {
      return e(n, M, A);
    });
  },
  D = [100, 300],
  x = function x(t, r) {
    r = r || {}, C(function () {
      var a,
        c = E(),
        u = f("FID"),
        l = function l(e) {
          e.startTime < c.firstHiddenTime && (u.value = e.processingStart - e.startTime, u.entries.push(e), a(!0));
        },
        m = function m(e) {
          e.forEach(l);
        },
        h = s("first-input", m);
      a = d(t, u, D, r.reportAllChanges), h && p(v(function () {
        m(h.takeRecords()), h.disconnect();
      })), h && o(function () {
        var o;
        u = f("FID"), a = d(t, u, D, r.reportAllChanges), i = [], n = -1, e = null, k(addEventListener), o = l, i.push(o), F();
      });
    });
  },
  B = 0,
  R = 1 / 0,
  H = 0,
  N = function N(e) {
    e.forEach(function (e) {
      e.interactionId && (R = Math.min(R, e.interactionId), H = Math.max(H, e.interactionId), B = H ? (H - R) / 7 + 1 : 0);
    });
  },
  O = function O() {
    return r ? B : performance.interactionCount || 0;
  },
  q = function q() {
    "interactionCount" in performance || r || (r = s("event", N, {
      type: "event",
      buffered: !0,
      durationThreshold: 0
    }));
  },
  j = [200, 500],
  _ = 0,
  z = function z() {
    return O() - _;
  },
  G = [],
  J = {},
  K = function K(e) {
    var n = G[G.length - 1],
      t = J[e.interactionId];
    if (t || G.length < 10 || e.duration > n.latency) {
      if (t) t.entries.push(e), t.latency = Math.max(t.latency, e.duration);else {
        var i = {
          id: e.interactionId,
          latency: e.duration,
          entries: [e]
        };
        J[i.id] = i, G.push(i);
      }
      G.sort(function (e, n) {
        return n.latency - e.latency;
      }), G.splice(10).forEach(function (e) {
        delete J[e.id];
      });
    }
  },
  Q = function Q(e, n) {
    n = n || {}, C(function () {
      var t;
      q();
      var i,
        r = f("INP"),
        a = function a(e) {
          e.forEach(function (e) {
            (e.interactionId && K(e), "first-input" === e.entryType) && !G.some(function (n) {
              return n.entries.some(function (n) {
                return e.duration === n.duration && e.startTime === n.startTime;
              });
            }) && K(e);
          });
          var n,
            t = (n = Math.min(G.length - 1, Math.floor(z() / 50)), G[n]);
          t && t.latency !== r.value && (r.value = t.latency, r.entries = t.entries, i());
        },
        c = s("event", a, {
          durationThreshold: null !== (t = n.durationThreshold) && void 0 !== t ? t : 40
        });
      i = d(e, r, j, n.reportAllChanges), c && ("PerformanceEventTiming" in window && "interactionId" in PerformanceEventTiming.prototype && c.observe({
        type: "first-input",
        buffered: !0
      }), p(function () {
        a(c.takeRecords()), r.value < 0 && z() > 0 && (r.value = 0, r.entries = []), i(!0);
      }), o(function () {
        G = [], _ = O(), r = f("INP"), i = d(e, r, j, n.reportAllChanges);
      }));
    });
  },
  U = [2500, 4e3],
  V = {},
  W = function W(e, n) {
    n = n || {}, C(function () {
      var t,
        i = E(),
        r = f("LCP"),
        a = function a(e) {
          var n = e[e.length - 1];
          n && n.startTime < i.firstHiddenTime && (r.value = Math.max(n.startTime - u(), 0), r.entries = [n], t());
        },
        c = s("largest-contentful-paint", a);
      if (c) {
        t = d(e, r, U, n.reportAllChanges);
        var m = v(function () {
          V[r.id] || (a(c.takeRecords()), c.disconnect(), V[r.id] = !0, t(!0));
        });
        ["keydown", "click"].forEach(function (e) {
          addEventListener(e, function () {
            return setTimeout(m, 0);
          }, !0);
        }), p(m), o(function (i) {
          r = f("LCP"), t = d(e, r, U, n.reportAllChanges), l(function () {
            r.value = performance.now() - i.timeStamp, V[r.id] = !0, t(!0);
          });
        });
      }
    });
  },
  X = [800, 1800],
  Y = function e(n) {
    document.prerendering ? C(function () {
      return e(n);
    }) : "complete" !== document.readyState ? addEventListener("load", function () {
      return e(n);
    }, !0) : setTimeout(n, 0);
  },
  Z = function Z(e, n) {
    n = n || {};
    var t = f("TTFB"),
      i = d(e, t, X, n.reportAllChanges);
    Y(function () {
      var r = c();
      if (r) {
        var a = r.responseStart;
        if (a <= 0 || a > performance.now()) return;
        t.value = Math.max(a - u(), 0), t.entries = [r], i(!0), o(function () {
          t = f("TTFB", 0), (i = d(e, t, X, n.reportAllChanges))(!0);
        });
      }
    });
  };

function reportPerformanceLogs() {
  var _getStore = getStore(),
    queuedPerformanceLogs = _getStore.queuedPerformanceLogs;
  if (queuedPerformanceLogs.size === 0) {
    return;
  }
  var body = [].concat(queuedPerformanceLogs);
  var _getStore2 = getStore(),
    projectId = _getStore2.projectId;
  var requestUrl = BACKEND_DOMAIN + "/api/verybugs/performance/add";
  var requestData = {
    projectId: projectId,
    list: body
  };
  var isQueued = sendBeacon(requestUrl, requestData);
  if (!isQueued) {
    request({
      url: requestUrl,
      method: 'post',
      data: requestData,
      timeout: 60 * 1000
    })["catch"](function (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }
  queuedPerformanceLogs.clear();
  updateStore({
    queuedPerformanceLogs: queuedPerformanceLogs
  });
}
function addPerformanceLog(metric) {
  if (!['navigate', 'reload'].includes(metric.navigationType)) {
    return;
  }
  var _getStore3 = getStore(),
    queuedPerformanceLogs = _getStore3.queuedPerformanceLogs;
  queuedPerformanceLogs.add({
    name: metric.name,
    rating: metric.rating,
    value: metric.value,
    navigationType: metric.navigationType,
    pageUrl: location.href
  });
  updateStore({
    queuedPerformanceLogs: queuedPerformanceLogs
  });
  if (window.requestIdleCallback) {
    window.requestIdleCallback(reportPerformanceLogs);
  }
}

var initPerformancePlugin = function initPerformancePlugin() {
  S(addPerformanceLog);
  Z(addPerformanceLog);
  W(addPerformanceLog);
  Q(addPerformanceLog);
  w(addPerformanceLog);
  x(addPerformanceLog);
  // Report all available metrics whenever the page is backgrounded or unloaded.
  addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      reportPerformanceLogs();
    }
  });
  // NOTE: Safari does not reliably fire the `visibilitychange` event when the
  // page is being unloaded. If Safari support is needed, you should also flush
  // the queue in the `pagehide` event.
  addEventListener('pagehide', reportPerformanceLogs);
};

var init = function init(settings) {
  updateStore(settings);
  initViewPlugin();
  initLogPlugin();
  initActionPlugin();
  initErrorPlugin();
  initPerformancePlugin();
};
// 尝试找到引入better-monitor.min.js文件的script标签，如果用户主动设置了`data-project-id`属性则直接进行初始化
var tryInitSettingAutomatically = function tryInitSettingAutomatically() {
  var elemScripts = document.querySelectorAll('script');
  var targetElem = null;
  for (var i = 0, len = elemScripts.length; i < len; i++) {
    var elem = elemScripts[i];
    var src = elem.getAttribute('src');
    if (src && src.includes('/better-monitor.min.js')) {
      targetElem = elem;
      break;
    }
  }
  if (targetElem) {
    var dataProjectId = targetElem.getAttribute('data-project-id');
    var dataView = targetElem.getAttribute('data-view');
    var dataLog = targetElem.getAttribute('data-log');
    var dataError = targetElem.getAttribute('data-error');
    var dataAction = targetElem.getAttribute('data-action');
    if (dataProjectId) {
      init({
        projectId: dataProjectId,
        view: ![0, '0'].includes(dataView || ''),
        log: ![0, '0'].includes(dataLog || ''),
        error: ![0, '0'].includes(dataError || ''),
        action: ![0, '0'].includes(dataAction || '')
      });
    }
  }
};
tryInitSettingAutomatically();
var returnObj = {
  init: init,
  addBug: addBug,
  addView: addView,
  printLog: printLog,
  printLogDirectly: printLogDirectly,
  printWarn: printWarn,
  printWarnDirectly: printWarnDirectly,
  printError: printError,
  printErrorDirectly: printErrorDirectly,
  logTime: logTime,
  logTimeEnd: logTimeEnd,
  logTimeEndDirectly: logTimeEndDirectly,
  updateStore: updateStore,
  getStore: getStore
};
window.console.log('%c已集成window.BetterMonitor对象😃\n详情请参阅官网https://www.verybugs.com', 'background: #ff5900; color: #000');

module.exports = returnObj;
