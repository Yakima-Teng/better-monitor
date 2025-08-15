export const getError = (err?: unknown): Error => {
  if (typeof err === "string") {
    return new Error(err);
  }
  if (err instanceof Error) {
    return err;
  }
  if (
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof err.message === "string"
  ) {
    return new Error(err.message);
  }
  return new Error(JSON.stringify(err));
};

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

export const getType = (val: unknown): VariableType => {
  return ({}).toString.call(val).slice(8, -1).toLowerCase() as VariableType
}

/**
 * @apiAnalyze
 * 是否是函数
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
export const isFunction = (val: unknown): val is Func => {
  return getType(val) === 'function'
}

/**
 * @apiAnalyze
 * 是否是对象
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
export const isObject = (val: unknown): val is object =>{
  return  getType(val) === 'object'
}

/**
 * @apiAnalyze
 * 是否是字符串
 * @since 0.02
 * @param val {unknown}
 * @return {boolean}
 */
export const isString = (val: unknown): val is string => {
  return getType(val) === 'string'
}
